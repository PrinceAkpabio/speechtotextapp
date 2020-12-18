import speech_recognition as sr
from flask import Flask, request

app = Flask(__name__)


@app.route('/request', methods=["POST"])
def SpeechReg():
    r = sr.Recognizer()
    m = sr.Microphone()
    if request.headers['Content-Type'] == 'application/json':
        data = request.get_data()
        print(data)
        if data:
            try:
                print("A moment of silence, please...")
                with m as source:
                    r.adjust_for_ambient_noise(source)
                    setConverter = r.energy_threshold
                print("Set minimum energy threshold to {}".format(
                    setConverter))
                while True:
                    print("Say something!")
                    with m as source:
                        audio = r.listen(source)
                    print("Got it! Now to recognize it...")
                    try:
                        value = r.recognize_google(audio)
                        text = str(value)
                        print(text)
                        if isinstance(text, str):
                            break
                    except Exception as err:
                        print('There was an error in speech conversion :', err)
            except KeyboardInterrupt:
                pass

            return {
                "text": text
            }
