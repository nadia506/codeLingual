from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import time
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
API_KEY = os.environ['OPENAI_API_KEY']
app = Flask(__name__)

allowed_origins = ["http://localhost:3000", "https://codelingual-converter.netlify.app"]

CORS(app, resources={r"/convert-code": {"origins": allowed_origins}}, supports_credentials=True)

client = OpenAI(api_key=API_KEY)

@app.route('/')
def home():
    return 'Hello, World!'

@app.route("/convert-code", methods=['POST'])
def convert_code():
    data = request.json
    source_code = data.get('source_code')
    source_language = data.get('source_language')
    target_language = data.get('target_language')

    if not source_code or not source_language or not target_language:
        return jsonify({"error": "Missing source_code, source_language, or target_language"}), 400

    try:
        prompt_text = f"Convert this {source_language} code to {target_language}:\n\n{source_code}\n"
        thread = client.beta.threads.create()
        client.beta.threads.messages.create(
            thread_id=thread.id,
            role="user",
            content=prompt_text,
        )
        assistant = client.beta.assistants.retrieve("asst_LV3qKt4C2E9dfOJARZLZ86jo")
        run = client.beta.threads.runs.create(
            thread_id=thread.id,
            assistant_id=assistant.id,
            instructions="Please address the user's question. Just answer with the translated code without any explanations or any other words. Do not surround your answer with any code block markers like ```java or anything else.",
        )

        while run.status != "completed":
            run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)
            time.sleep(1)

        messages = client.beta.threads.messages.list(thread_id=thread.id)
        
        result = []
        for m in messages:
            result.append(m.content[0].text.value)
        
        print("API Response Messages:", result)

        converted_code = None
        for res in result:
            if f"Convert this {source_language} code to {target_language}" not in res and "Please paste your code in the code box" not in res:
                converted_code = res
                break

        if not converted_code:
            converted_code = "No valid conversion result found."

        return jsonify({"response": converted_code})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001)
