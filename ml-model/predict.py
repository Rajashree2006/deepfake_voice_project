
# import sys
# import numpy as np
# import librosa
# import joblib
# import pandas as pd
# import warnings
# import os

# # hide warnings
# warnings.filterwarnings("ignore")

# # load model and scaler
# base_dir = os.path.dirname(__file__)
# model = joblib.load(os.path.join(base_dir, "voice_model.pkl"))
# scaler = joblib.load(os.path.join(base_dir, "scaler.pkl"))

# # get audio file path
# file_path = sys.argv[1]

# # load audio (limit to 5 seconds for speed)
# audio, sr = librosa.load(file_path, sr=22050, duration=5)

# # ===== Feature Extraction =====

# # extract 25 MFCC features
# mfcc = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=25)

# # take mean of each coefficient
# features = np.mean(mfcc.T, axis=0)

# # convert to dataframe
# X = pd.DataFrame([features])

# # scale features
# X_scaled = scaler.transform(X)

# # predict
# prediction = model.predict(X_scaled)

# # output result (0 or 1)
# print(int(prediction[0]))




import sys
import numpy as np
import librosa
import joblib
import pandas as pd
import os
import warnings

warnings.filterwarnings("ignore")

# load model and scaler
base_dir = os.path.dirname(__file__)

model = joblib.load(os.path.join(base_dir, "voice_model.pkl"))
scaler = joblib.load(os.path.join(base_dir, "scaler.pkl"))
print("Model expects:", model.n_features_in_)
# get audio file path
file_path = sys.argv[1]

# load audio
audio, sr = librosa.load(file_path, sr=None)

# ===== Extract SAME features as training =====

mfcc = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=25)
mfcc_mean = np.mean(mfcc.T, axis=0)
mfcc_std = np.std(mfcc.T, axis=0)

features = np.concatenate((mfcc_mean, mfcc_std))
features = np.mean(mfcc.T, axis=0)
print("Extracted features:", len(features))
X = pd.DataFrame([features])

# scale
# X_scaled = scaler.transform(X)

# # predict
# # prediction = model.predict(X_scaled)

# # print(int(prediction[0]))


# prob = model.predict_proba(X_scaled)
# print("Probabilities:", prob)

# prediction = model.predict(X_scaled)
# print(int(prediction[0]))

# scale
X_scaled = scaler.transform(X)

prob = model.predict_proba(X_scaled)

fake_prob = prob[0][1]

if fake_prob > 0.20:
    print(1)
else:
    print(0)