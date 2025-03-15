from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
import google.generativeai as genai
from langchain_community.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
import os
import re

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up the API key for Google Generative AI
api_key = "AIzaSyBm0fRPZtu-Q_a6RNsAB9CdriWWSy4CT6U"  # Replace with your actual Google API key
genai.configure(api_key=api_key)

# Set project folder for FAISS index
project_folder = os.path.join(os.getcwd(), "faiss_index")

# Function to detect language (simplified detection for common languages)
def detect_language(text):
    # Hindi/Hinglish detection (simplified)
    hindi_pattern = re.compile(r'[\u0900-\u097F]')  # Unicode range for Hindi characters
    if hindi_pattern.search(text):
        return "hindi"
    
    # Check for common Hindi/Hinglish words or transliteration patterns
    hinglish_words = ["kya", "hai", "kaise", "aap", "tum", "hum", "mein", "nahin", "nahi", "karo", 
                      "karenge", "bolo", "batao", "puchho", "sunao", "kyun", "kyon", "namaste"]
    
    words = text.lower().split()
    for word in words:
        if word in hinglish_words:
            return "hinglish"
    
    # Add more language detection logic here for other languages
    
    # Default to English
    return "english"

# Function to load conversational AI chain with multilingual support
def get_conversational_chain(language="english"):
    # Base prompt template
    base_template = """
    Answer the question in the same language as the question was asked. Do not use markdown formatting like ** for bold text in your response.
    If the question is in Hindi or Hinglish (Hindi words written in English letters), respond in the same language.
    Answer the question as detailed as possible from the provided context, make sure to provide all the details. 
    If the answer is not in the provided context, just say, "answer is not available in the context" in the appropriate language; don't provide a wrong answer.
    
    Context:\n {context}?\n
    Question: \n{question}\n

    Answer:
    """
    
    # Create a model with appropriate temperature
    model = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.3, google_api_key=api_key)
    prompt = PromptTemplate(template=base_template, input_variables=["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    return chain

# Function to clean response from markdown or formatting symbols
def clean_response(text):
    # Remove markdown formatting like **bold** -> bold
    cleaned = re.sub(r'\*\*(.*?)\*\*', r'\1', text)
    # Add more cleaning patterns if needed
    return cleaned

# Function to handle user input and generate responses
def process_user_input(user_question, conversation_history=""):
    try:
        # Detect language
        language = detect_language(user_question)
        
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=api_key)
        new_db = FAISS.load_local(project_folder, embeddings, allow_dangerous_deserialization=True)
        docs = new_db.similarity_search(user_question)
        
        # Get chain with appropriate language settings
        chain = get_conversational_chain(language)
        
        # Include conversation history in the context if provided
        full_question = f"{conversation_history}\nuser: {user_question}" if conversation_history else user_question
        
        response = chain.invoke({"input_documents": docs, "question": full_question}, return_only_outputs=True)
        
        # Clean the response from any markdown formatting
        cleaned_response = clean_response(response["output_text"])
        
        return cleaned_response
    except Exception as e:
        # Return error message in detected language or English as fallback
        language = detect_language(user_question)
        if language == "hindi":
            return "आपके अनुरोध को संसाधित करने में त्रुटि हुई। कृपया बाद में पुन: प्रयास करें।"
        elif language == "hinglish":
            return "Aapke request ko process karne mein error hua hai. Kripya baad mein dobara try karein."
        else:
            return f"Error processing your request: {str(e)}"

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_question = data.get('message', '')
    conversation_history = data.get('history', '')
    
    if not user_question:
        return jsonify({"error": "No message provided"}), 400
    
    response = process_user_input(user_question, conversation_history)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)