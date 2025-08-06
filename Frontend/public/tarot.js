  
        document.addEventListener('DOMContentLoaded', function() {
            const carousel = document.getElementById('carousel');
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            const pickCardsBtn = document.getElementById('pick-cards');
            const resetBtn = document.getElementById('reset');
            const selectedCardsContainer = document.getElementById('selected-cards');
            const readingResult = document.getElementById('reading-result');
            const readingText = document.getElementById('reading-text');

            const tarotCards = [
                { 
                    name: "The Fool", 
                    symbol: "♚", 
                    meaning: "New beginnings, innocence, spontaneity, free spirit", 
                    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f172f026-02e9-4383-927a-185d570ee76b.png",
                    description: "The Fool reပစ္စုပ္ပန်s new beginnings, having faith in the အနာဂတ်, and unexpected adventure. Drawn to learning and life experiences, The Fool walks happily toward the edge of a cliff, unaware he's about to fall."
                },
                { 
                    name: "The Magician", 
                    symbol: "☆", 
                    meaning: "Willpower, desire, creation, manifestation", 
                    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8da01921-9bc9-493d-b30e-7434dc07a63f.png",
                    description: "The Magician reပစ္စုပ္ပန်s the principle of 'as above, so below' - the connection between the spiritual and material worlds. With all four Tarot suits at his disposal, the Magician channels power through the symbols of Tarot to manifest the reality he desires."
                },
                { 
                    name: "The High Priestess", 
                    symbol: "☾", 
                    meaning: "Intuition, sacred knowledge, divine feminine", 
                    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f07d54ba-e41c-4f46-bd61-b7524ceabcb6.png",
                    description: "The High Priestess sits between two pillars - one black, one white - reပစ္စုပ္ပန်ing duality. She has access to hidden knowledge and unconscious understanding. She advises looking beyond the obvious and trusting your intuition."
                },
                { 
                    name: "The Empress", 
                    symbol: "♀", 
                    meaning: "Femininity, beauty, nature, nurturing", 
                    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/37abed14-a7e2-4841-b38a-9a8b9aae2e7c.png",
                    description: "The Empress reပစ္စုပ္ပန်s the archetype of the Great Mother - fertility, femininity, beauty and nature. She signifies the creation of life, romance, art, or business, alongside abundance in the material and spiritual realms."
                },
                { 
                    name: "The Emperor", 
                    symbol: "♔", 
                    meaning: "Authority, structure, control, fatherhood", 
                    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c9183d49-c912-4c28-9921-c50674f5c65b.png",
                    description: "The Emperor reပစ္စုပ္ပန်s structure, stability, and regulation. He is a mature masculine figure who provides and protects, creating order from chaos. His presence suggests a need for logic over emotion and the establishment of rules."
                },
                { 
                    name: "The Hierophant", 
                    symbol: "⚭", 
                    meaning: "Tradition, conformity, morality, ethics", 
                    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0a5bf2a0-294a-4d94-8782-6499c757bebc.png",
                    description: "The Hierophant reပစ္စုပ္ပန်s spiritual wisdom and traditional values. He signifies institutions and their conventions, education, and group identification. When he appears, you may need to conform to social or group structures."
                },
                { 
                    name: "The Lovers", 
                    symbol: "♡", 
                    meaning: "Love, harmony, relationships, values alignment", 
                    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/13ac379e-83d5-4d64-8c9c-99d6c64029a3.png",
                    description: "The Lovers reပစ္စုပ္ပန် relationships and choices. Its appearance suggests important decisions grounded in your values. Often the card reflects romantic relationships, but it can also indicate deep friendships or other meaningful bonds."
                },
                { 
                    name: "The Chariot", 
                    symbol: "⊙", 
                    meaning: "Direction, control, willpower, victory", 
                    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a2bef1fd-7f8c-4732-a022-b655324c4f40.png",
                    description: "The Chariot reပစ္စုပ္ပန်s overcoming conflicts and moving forward in a positive direction. It suggests triumph, ambition, and determination. You're in control of competing forces and harnessing opposing energies to move toward success."
                },
                { 
                    name: "Strength", 
                    symbol: "♌", 
                    meaning: "Inner strength, bravery, compassion, influence", 
                    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/424ccc14-1560-46f4-b3dc-dc08b73a813c.png",
                    description: "Strength reပစ္စုပ္ပန်s inner strength, patience, and control. Rather than physical power, this card emphasizes compassion and influence to overcome challenges peacefully. It suggests you need to tame your emotions to master a situation."
                },
                { 
                    name: "The Hermit", 
                    symbol: "⌛", 
                    meaning: "Contemplation, search for truth, inner guidance", 
                    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/96cbe75a-72b5-47ee-b9d4-40bd7ff5382d.png",
                    description: "The Hermit reပစ္စုပ္ပန်s introspection and inner wisdom. This is a time for soul-searching, self-reflection, and withdrawal from the noise of the outside world. You may be seeking deeper meaning or needing to guide others."
                },
                { 
                    name: "Wheel of Fortune", 
                    symbol: "♻", 
                    meaning: "Change, cycles, fate, good fortune", 
                    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/106f6887-bbf2-4ae7-839c-213e28757381.png",
                    description: "The Wheel of Fortune reပစ္စုပ္ပန်s unexpected change, luck, and destiny. Life's cycles are always turning - what goes up must come down and vice versa. The card suggests you accept these changes with grace and understanding."
                },
                { 
                    name: "Justice", 
                    symbol: "⚖", 
                    meaning: "Justice, fairness, truth, cause and effect", 
                    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/aeaf2f04-7850-49d0-a136-8184a71ee0c7.png",
                    description: "Justice reပစ္စုပ္ပန်s fairness, truth, and law. Your actions and decisions will have consequences, either now or in the အနာဂတ်. The card calls you to account for your actions and to consider the greater good in your choices."
                }
            ];

            let selectedCards = [];
            let currentPosition = 0;
            const cardWidth = 150 + 20; // width + margin

            // Create cards
            tarotCards.forEach((card, index) => {
                const cardElement = document.createElement('div');
                cardElement.className = 'card';
                cardElement.dataset.index = index;
                cardElement.innerHTML = `
                    <div class="card-face card-front" style="background-image: url('${card.image}')">
                        <div class="card-name">${card.name}</div>
                    </div>
                    <div class="card-face card-back">
                        <div class="symbol">${card.symbol}</div>
                        <div class="card-meaning">${card.meaning}</div>
                    </div>
                `;
                carousel.appendChild(cardElement);

                cardElement.addEventListener('click', () => {
                    cardElement.classList.toggle('flipped');
                    
                    if (selectedCards.includes(index)) {
                        selectedCards = selectedCards.filter(i => i !== index);
                        cardElement.classList.remove('selected');
                    } else {
                        if (selectedCards.length < 3) {
                            selectedCards.push(index);
                            cardElement.classList.add('selected');
                        } else {
                            alert('You can only select 3 cards');
                            return;
                        }
                    }

                    updateSelectedCards();
                });
            });

            // Carousel navigation
            prevBtn.addEventListener('click', () => {
                if (currentPosition < 0) {
                    currentPosition += cardWidth * 3;
                    carousel.style.transform = `translateX(${currentPosition}px)`;
                }
            });

            nextBtn.addEventListener('click', () => {
                const maxPosition = -((tarotCards.length - 6) * cardWidth);
                if (currentPosition > maxPosition) {
                    currentPosition -= cardWidth * 3;
                    carousel.style.transform = `translateX(${currentPosition}px)`;
                }
            });

            // Pick random cards
            pickCardsBtn.addEventListener('click', () => {
                resetSelection();
                
                const availableCards = [...Array(tarotCards.length).keys()];
                const shuffled = availableCards.sort(() => 0.5 - Math.random());
                selectedCards = shuffled.slice(0, 3);
                
                selectedCards.forEach(index => {
                    const cardElement = carousel.children[index];
                    cardElement.classList.add('selected');
                    
                    // Auto scroll to make selected cards visible
                    const cardLeft = index * cardWidth;
                    if (cardLeft < -currentPosition || cardLeft > -currentPosition + carousel.parentElement.offsetWidth) {
                        currentPosition = -cardLeft;
                        carousel.style.transform = `translateX(${currentPosition}px)`;
                    }
                });
                
                updateSelectedCards();
            });

            // Reset selection
            resetBtn.addEventListener('click', resetSelection);

            function resetSelection() {
                document.querySelectorAll('.card').forEach(card => {
                    card.classList.remove('selected');
                    card.classList.remove('flipped');
                });
                selectedCards = [];
                document.getElementById('current-selection').innerHTML = '';
                document.getElementById('card-info').style.display = 'none';
                document.getElementById('card-info').style.opacity = '0';
                readingResult.style.display = 'none';
            }

            function updateSelectedCards() {
                const currentSelection = document.getElementById('current-selection');
                const cardInfo = document.getElementById('card-info');
                
                if (selectedCards.length > 0) {
                    const currentCardIndex = selectedCards[selectedCards.length - 1];
                    const card = tarotCards[currentCardIndex];
                    
                    // Animate card moving to selection area
                    const clonedCard = carousel.children[currentCardIndex].cloneNode(true);
                    clonedCard.className = 'selected-card moving-card';
                    currentSelection.innerHTML = '';
                    currentSelection.appendChild(clonedCard);
                    
                    // Update card info with fade-in animation
                    cardInfo.style.display = 'block';
                    setTimeout(() => {
                        cardInfo.style.opacity = '1';
                        cardInfo.style.transition = 'opacity 0.5s ease';
                    }, 300);
                    cardInfo.innerHTML = `
                        <div class="symbol" style="font-size:3rem; margin-top:10px;">${card.symbol}</div>
                        <div class="card-details">
                            <h3 class="card-info-title">${card.name}</h3>
                            <div class="card-info-content">
                                <p><strong>Meaning:</strong> ${card.meaning}</p>
                                <p><strong>Full Description:</strong></p>
                                <p>${card.description}</p>
                            </div>
                        </div>
                    `;
                    
                    if (selectedCards.length === 3) {
                        showReading();
                    }
                } else {
                    currentSelection.innerHTML = '';
                    cardInfo.style.display = 'none';
                }
            }

            function showReading() {
                readingResult.style.display = 'block';
                let reading = '';
                
                if (selectedCards.length === 3) {
                    const အတိတ် = tarotCards[selectedCards[0]];
                    const ပစ္စုပ္ပန် = tarotCards[selectedCards[1]];
                    const အနာဂတ် = tarotCards[selectedCards[2]];
                    
                    reading = `
                        <p><strong>အတိတ်:</strong> ${အတိတ်.description}</p>
                        <p><strong>ပစ္စုပ္ပန်:</strong> ${ပစ္စုပ္ပန်.description}</p>
                        <p><strong>အနာဂတ်:</strong> ${အနာဂတ်.description}</p>
                        <p>This reading suggests your journey from ${အတိတ်.name} to ${ပစ္စုပ္ပန်.name} will lead to ${အနာဂတ်.name}.</p>
                    `;
                }
                
                readingText.innerHTML = reading;
            }
        });