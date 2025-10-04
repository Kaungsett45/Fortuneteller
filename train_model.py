# train_model.py
import csv, joblib, cv2, numpy as np
from pathlib import Path
from sklearn.linear_model import LinearRegression

CSV = Path("labels.csv")                 # edit path
MODEL_OUT = Path("models/palm_regressor.joblib")
MODEL_OUT.parent.mkdir(exist_ok=True, parents=True)

def preprocess(bgr):
    gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
    gray = cv2.equalizeHist(gray)
    gray = cv2.resize(gray, (128, 128))
    edges = cv2.Canny(gray, 60, 150)
    feat = np.hstack([gray.flatten()/255.0, edges.flatten()/255.0, [edges.mean(), edges.std()]]).astype(np.float32)
    return feat

X, Y = [], []
with open(CSV, newline='', encoding='utf-8') as f:
    for row in csv.DictReader(f):
        img = cv2.imread(row["path"])
        if img is None: continue
        X.append(preprocess(img))
        Y.append([float(row["lifespan"]), float(row["marriage_age"]), float(row["kids"])])

X = np.asarray(X, np.float32)
Y = np.asarray(Y, np.float32)

reg = LinearRegression().fit(X, Y)
joblib.dump(reg, MODEL_OUT)
print("Saved:", MODEL_OUT)
