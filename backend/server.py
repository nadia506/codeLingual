from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import time
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
API_KEY = os.environ['OPENAI_API_KEY']
app = Flask(__name__)

# Initialize CORS with default settings or specific origins
CORS(app, resources={r"/convert-code": {"origins": "http://localhost:3000"}}, supports_credentials=True)



# Your Flask routes...

client = OpenAI(api_key=API_KEY)

@app.route("/convert-code", methods=['POST'])
def convert_code():
   
    
        data = request.json
        source_code = data.get('source_code')
        source_language = data.get('source_language')
        target_language = data.get('target_language')

        try:
            prompt_text = f"Convert this {source_language} code to {target_language}:\n\n{source_code}\n"
            thread = client.beta.threads.create()
            message = client.beta.threads.messages.create(
                thread_id=thread.id,
                role="user",
                content=prompt_text,
            )
            assistant = client.beta.assistants.retrieve("asst_LV3qKt4C2E9dfOJARZLZ86jo")
            run = client.beta.threads.runs.create(
                thread_id=thread.id,
                assistant_id=assistant.id,
                instructions="Please address the user's question. Just answer with the translated code without any explainations or any other words",
            )

            while True:
                if run.status == "completed":
                    break
                run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)
                time.sleep(1)

            result = []
            messages = client.beta.threads.messages.list(thread_id=thread.id)
            for m in messages:
                result.append(m.content[0].text.value)

            return jsonify({"response": result})
        except Exception as e:
            return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True,port=5001)