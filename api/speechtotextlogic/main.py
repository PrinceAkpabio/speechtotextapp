import speech_recognition as sr


def SpeechReg():
    r = sr.Recognizer()
    m = sr.Microphone()
    SpeechReg.output = ''
    try:
        print("A moment of silence, please...")
        with m as source:
            r.adjust_for_ambient_noise(source)
        print("Set minimum energy threshold to {}".format(r.energy_threshold))
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
                # return SpeechReg.output
                # return SpeechReg()
            except sr.UnknownValueError:
                print("Oops! Didn't catch that")
            except sr.RequestError as e:
                print(
                    "Uh oh! Couldn't request results from Google Speech Recognition service; {0}".format(e))
    except KeyboardInterrupt:
        pass


# SpeechReg()
