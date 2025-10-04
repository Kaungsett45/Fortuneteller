from flask import Flask, render_template, request
import cv2
import mediapipe as mp
import os, random 
from flask import Flask, render_template
import numpy as np
import re
import json
import requests
import json
app = Flask(__name__)
UPLOAD_FOLDER = "static"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB limit

mp_hands = mp.solutions.hands
mp_draw = mp.solutions.drawing_utils


OPENROUTER_API_KEY ="#######"


def clean_myanmar_text(text):
    # Remove duplicate punctuation
    text = re.sub(r"[၊]{2,}", "၊", text)  # consecutive ၊
    text = re.sub(r"[။]{2,}", "။", text)  # consecutive ။
    
    # Remove duplicate Myanmar characters (လိုိုင်း → လိုင်း)
    text = re.sub(r'([က-ဪ၌-၏၎-႟])\1+', r'\1', text)

    # Fix "အ အ" issue
    text = re.sub(r'အ\s+အ', 'အ', text)

    # Remove extra spaces
    text = re.sub(r'\s{2,}', ' ', text).strip()

    return text



def detect_palm(img_path):
    img = cv2.imread(img_path)
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    with mp_hands.Hands(static_image_mode=True, max_num_hands=1) as hands:
        result = hands.process(rgb)
        if result.multi_hand_landmarks:
            return True  # palm detected
    return False


def enhance_palm_lines(input_path, output_path):
    img = cv2.imread(input_path)

    # 1. Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # 2. Reduce noise
    blur = cv2.GaussianBlur(gray, (5, 5), 0)

    # 3. Enhance contrast (CLAHE makes palm lines more visible)
    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
    enhanced = clahe.apply(blur)

    # 4. Adaptive threshold (better than Canny for palm lines)
    thresh = cv2.adaptiveThreshold(
        enhanced, 255,
        cv2.ADAPTIVE_THRESH_MEAN_C,
        cv2.THRESH_BINARY_INV,
        15, 10
    )

    # 5. Optional: Keep only central hand area to avoid background
    h, w = thresh.shape
    mask = np.zeros_like(thresh)
    cv2.circle(mask, (w//2, h//2), min(h,w)//2, 255, -1)  # circular mask around hand
    palm_only = cv2.bitwise_and(thresh, mask)

    # 6. Convert back to BGR for saving
    result = cv2.cvtColor(palm_only, cv2.COLOR_GRAY2BGR)

    cv2.imwrite(output_path, result)
# AI interpretation with OpenRouterdef ai_interpret(fate_line, heart_line, head_line):
    # Build the prompt

def ai_interpret(fate_line, heart_line, head_line):
    fate_line = fate_line or ""
    heart_line = heart_line or ""
    head_line = head_line or ""

    prompt = f"""
- ကံကြောင်းလိုင်း: {fate_line}
- နှလုံးသားလိုင်း: {heart_line}
- ဦးနှောက်လိုင်း: {head_line}

မြန်မာလို အကျဉ်းချုပ် **မူရင်းနည်းစဉ်အတိုင်းသာ** ပြန်ပေးပါ။ 

အရင်ဆုံး စာကြိုဆက် စာမပါ၊ "ကျေးဇူးတင်ပါသည်" စတဲ့ စကားမပါ။ 
1. **အဓိပ္ပာယ်**
2. **အနာဂတ်ဟောကိန်း**
3. **သတိထားရန်**
စာပိုဒ်တိုတိုနဲ့ ဖတ်ရလွယ်အောင် ထုတ်ပေးပါ။
နောက်ဆုံးတွင် **မှတ်ချက်တိုတို** ထည့်ပေးပါ။
"""

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "deepseek/deepseek-chat-v3.1",  #
            "messages": [
                {"role": "system", "content": "You are an expert Myanmar palm reader and fortune teller. Always use correct Myanmar vocabulary."},
                {"role": "user", "content": prompt}
            ],
              "max_tokens": 1000
        },
        timeout=15
    )

    data = response.json()

    try:
        result_text = data["choices"][0]["message"]["content"]
    except (KeyError, IndexError, TypeError):
        result_text = f"AI service error: {data}"
    # Clean repeated Myanmar letters
    result_text = re.sub(r'(.)\1{1,}', r'\1', result_text)

    accuracy = random.randint(55, 90)
    return result_text, accuracy

 
 
@app.route("/", methods=["GET"])
def index():
    return render_template("index.html", error=None)


@app.route("/analyze", methods=["POST"])
def analyze():
    if 'photo' not in request.files:
        return render_template("index.html", error="❌ No photo received!")

    file = request.files['photo']
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filepath)

    # Palm detection (fake for now)
    if not detect_palm(filepath):
        return render_template("index.html", error="❌ No palm detected! Try again.")

    processed_path = os.path.join(app.config['UPLOAD_FOLDER'], "processed_" + file.filename)
    enhance_palm_lines(filepath, processed_path)

    reading, accuracy = ai_interpret(processed_path, None, None)

    return render_template("result.html",
                           result_img=processed_path,
                           reading=reading,
                           accuracy=accuracy)


def enhance_palm_lines(input_path, output_path):
    img = cv2.imread(input_path)
    cv2.imwrite(output_path, img)
    return output_path

if __name__ == "__main__":
    app.run(debug=True)

