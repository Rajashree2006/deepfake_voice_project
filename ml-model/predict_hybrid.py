# import sys
# import numpy as np
# import librosa
# import pickle
# import torch
# import torch.nn as nn
# import os
# import warnings

# warnings.filterwarnings("ignore")

# # ===== CNN MODEL (same as training) =====
# class CNN1D(nn.Module):
#     def __init__(self, input_len=25):
#         super().__init__()
#         self.block1 = nn.Sequential(
#             nn.Conv1d(1, 32, kernel_size=3, padding=1),
#             nn.BatchNorm1d(32), nn.ReLU(), nn.MaxPool1d(2))
#         self.block2 = nn.Sequential(
#             nn.Conv1d(32, 64, kernel_size=3, padding=1),
#             nn.BatchNorm1d(64), nn.ReLU(), nn.MaxPool1d(2))
#         self.block3 = nn.Sequential(
#             nn.Conv1d(64, 128, kernel_size=3, padding=1),
#             nn.BatchNorm1d(128), nn.ReLU(),
#             nn.AdaptiveAvgPool1d(1))
#         self.head = nn.Sequential(
#             nn.Flatten(),
#             nn.Linear(128, 64), nn.ReLU(), nn.Dropout(0.3),
#             nn.Linear(64, 1), nn.Sigmoid())

#     def forward(self, x):
#         return self.head(self.block3(self.block2(self.block1(x)))).squeeze(1)

# # ===== LOAD MODEL =====
# base_dir = os.path.dirname(__file__)

# with open(os.path.join(base_dir, "merged_model.pkl"), "rb") as f:
#     model = pickle.load(f)

# # load CNN
# cnn = CNN1D(model['cnn_input_len'])
# cnn.load_state_dict(model['cnn_state'])
# cnn.eval()

# # ===== AUDIO INPUT =====
# file_path = sys.argv[1]
# audio, sr = librosa.load(file_path, sr=16000)

# # ===== FEATURE EXTRACTION (IMPORTANT) =====
# def extract_features(audio, sr):
#     features = []

#     # MFCC
#     mfcc = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=25)
#     features.extend(np.mean(mfcc.T, axis=0))
    

#     return np.array(features)

# X = extract_features(audio, sr).reshape(1, -1)

# # ===== CNN BRANCH =====
# X_std = model['std_scaler'].transform(X)
# X_tensor = torch.FloatTensor(X_std).unsqueeze(1)

# with torch.no_grad():
#     p_cnn = cnn(X_tensor).numpy()[0]

# # ===== HYBRID STACK =====
# X_mm = model['mm_scaler'].transform(X)
# X_pc = model['pca'].transform(X_mm)

# p_stack = model['stacking_model'].predict_proba(X_pc)[0][1]
# p_lr = model['stacking_model'].named_estimators_['lr'].predict_proba(X_pc)[0][1]

# # ===== FINAL MERGE =====
# w = model['weights']

# final_prob = (
#     w['cnn'] * p_cnn +
#     w['stack'] * p_stack +
#     w['lr'] * p_lr
# )

# # ===== OUTPUT =====
# if final_prob >= 0.5:
#     print(1)  # REAL
# else:
#     print(0)  # FAKE



# import sys
# import numpy as np
# import librosa
# import pickle
# import torch
# import torch.nn as nn
# import os
# import warnings

# warnings.filterwarnings("ignore")

# # ===== CNN MODEL =====
# class CNN1D(nn.Module):
#     def __init__(self, input_len=25):
#         super().__init__()
#         self.block1 = nn.Sequential(
#             nn.Conv1d(1, 32, kernel_size=3, padding=1),
#             nn.BatchNorm1d(32), nn.ReLU(), nn.MaxPool1d(2))
#         self.block2 = nn.Sequential(
#             nn.Conv1d(32, 64, kernel_size=3, padding=1),
#             nn.BatchNorm1d(64), nn.ReLU(), nn.MaxPool1d(2))
#         self.block3 = nn.Sequential(
#             nn.Conv1d(64, 128, kernel_size=3, padding=1),
#             nn.BatchNorm1d(128), nn.ReLU(),
#             nn.AdaptiveAvgPool1d(1))
#         self.head = nn.Sequential(
#             nn.Flatten(),
#             nn.Linear(128, 64), nn.ReLU(), nn.Dropout(0.3),
#             nn.Linear(64, 1), nn.Sigmoid())

#     def forward(self, x):
#         return self.head(self.block3(self.block2(self.block1(x)))).squeeze(1)

# # ===== CHECK INPUT =====
# if len(sys.argv) < 2:
#     print("Usage: python predict_hybrid.py <audio_file>")
#     sys.exit(1)

# file_path = sys.argv[1]

# if not os.path.exists(file_path):
#     print("File not found!")
#     sys.exit(1)

# # ===== LOAD MODEL =====
# base_dir = os.path.dirname(__file__)

# with open(os.path.join(base_dir, "merged_model.pkl"), "rb") as f:
#     model = pickle.load(f)

# # load CNN
# cnn = CNN1D(model['cnn_input_len'])
# cnn.load_state_dict(model['cnn_state'])
# cnn.eval()

# # ===== LOAD AUDIO =====
# try:
#     audio, sr = librosa.load(file_path, sr=16000)
# except Exception as e:
#     print("Error loading audio:", e)
#     sys.exit(1)

# # ===== NORMALIZE AUDIO LENGTH (VERY IMPORTANT) =====
# target_len = 16000 * 3  # 3 seconds

# if len(audio) < target_len:
#     audio = np.pad(audio, (0, target_len - len(audio)))
# else:
#     audio = audio[:target_len]

# # ===== FEATURE EXTRACTION =====
# def extract_features(audio, sr):
#     features = []

#     # MFCC (same count as training)
#     mfcc = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=25)

#     # mean only (to match training size = 25)
#     features.extend(np.mean(mfcc.T, axis=0))
    

#     return np.array(features)

# X = extract_features(audio, sr).reshape(1, -1)

# # ===== DEBUG =====
# print("Feature shape:", X.shape)

# # ===== SAFETY CHECK =====
# if X.shape[1] != model['cnn_input_len']:
#     print("Feature size mismatch!")
#     sys.exit(1)

# # ===== CNN BRANCH =====
# X_std = model['std_scaler'].transform(X)
# X_tensor = torch.FloatTensor(X_std).unsqueeze(1)

# with torch.no_grad():
#     p_cnn = cnn(X_tensor).numpy()[0]

# # ===== HYBRID STACK =====
# X_mm = model['mm_scaler'].transform(X)
# X_pc = model['pca'].transform(X_mm)

# p_stack = model['stacking_model'].predict_proba(X_pc)[0][1]
# p_lr = model['stacking_model'].named_estimators_['lr'].predict_proba(X_pc)[0][1]


# print("p_stack:", p_stack)
# print("p_lr:", p_lr)

# # ===== FINAL MERGE =====
# w = model['weights']

# # final_prob = (
# #     w['cnn'] * p_cnn +
# #     w['stack'] * p_stack +
# #     w['lr'] * p_lr
# # )

# # final_prob = p_lr
# if p_lr < 0.2 or p_lr > 0.8:
#     final_prob = p_lr
# else:
#     final_prob = 0.7 * p_lr + 0.3 * p_cnn

# print("Final Probability:", round(float(final_prob), 4))

# # ===== OUTPUT =====
# threshold = 0.7


# import json

# # ===== FINAL DECISION =====
# threshold = 0.7

# label = "FAKE" if final_prob >= threshold else "REAL"

# ooutput = {
#     "prediction": int(final_prob >= threshold),
#     "label": label,
#     "probability": float(final_prob),

#     # 🔥 REAL CNN DATA (not images anymore)
#     "activations": {
#         "block1": act1.squeeze(0).numpy().max(axis=1).tolist(),
#         "block2": act2.squeeze(0).numpy().max(axis=1).tolist(),
#         "block3": act3.squeeze(0).numpy().flatten().tolist()
#     },

#     # 🔥 RAW FEATURE VALUES
#     "features": X.flatten().tolist()
# }

# print(json.dumps(output))



import sys
import numpy as np
import librosa
import pickle
import torch
import torch.nn as nn
import os
import warnings
import json

warnings.filterwarnings("ignore")

# ===== CNN MODEL =====
class CNN1D(nn.Module):
    def __init__(self, input_len=25):
        super().__init__()
        self.block1 = nn.Sequential(
            nn.Conv1d(1, 32, kernel_size=3, padding=1),
            nn.BatchNorm1d(32), nn.ReLU(), nn.MaxPool1d(2))

        self.block2 = nn.Sequential(
            nn.Conv1d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm1d(64), nn.ReLU(), nn.MaxPool1d(2))

        self.block3 = nn.Sequential(
            nn.Conv1d(64, 128, kernel_size=3, padding=1),
            nn.BatchNorm1d(128), nn.ReLU(),
            nn.AdaptiveAvgPool1d(1))

        self.head = nn.Sequential(
            nn.Flatten(),
            nn.Linear(128, 64), nn.ReLU(), nn.Dropout(0.3),
            nn.Linear(64, 1), nn.Sigmoid())

    # 🔥 RETURN ACTIVATIONS ALSO
    def forward(self, x):
        x1 = self.block1(x)
        x2 = self.block2(x1)
        x3 = self.block3(x2)

        out = self.head(x3).squeeze(1)

        return out, x1, x2, x3


# ===== CHECK INPUT =====
if len(sys.argv) < 2:
    print('{"error":"No input file"}')
    sys.exit(1)

file_path = sys.argv[1]

if not os.path.exists(file_path):
    print('{"error":"File not found"}')
    sys.exit(1)

# ===== LOAD MODEL =====
base_dir = os.path.dirname(__file__)

with open(os.path.join(base_dir, "merged_model.pkl"), "rb") as f:
    model = pickle.load(f)

cnn = CNN1D(model['cnn_input_len'])
cnn.load_state_dict(model['cnn_state'])
cnn.eval()

# ===== LOAD AUDIO =====
try:
    audio, sr = librosa.load(file_path, sr=16000)
except Exception:
    print('{"error":"Audio loading failed"}')
    sys.exit(1)

# ===== NORMALIZE AUDIO LENGTH =====
target_len = 16000 * 3

if len(audio) < target_len:
    audio = np.pad(audio, (0, target_len - len(audio)))
else:
    audio = audio[:target_len]

# ===== FEATURE EXTRACTION =====
def extract_features(audio, sr):
    mfcc = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=25)
    return np.mean(mfcc.T, axis=0)

X = extract_features(audio, sr).reshape(1, -1)

# ===== SAFETY CHECK =====
if X.shape[1] != model['cnn_input_len']:
    print('{"error":"Feature mismatch"}')
    sys.exit(1)

# ===== CNN BRANCH =====
X_std = model['std_scaler'].transform(X)
X_tensor = torch.FloatTensor(X_std).unsqueeze(1)

with torch.no_grad():
    p_cnn, act1, act2, act3 = cnn(X_tensor)
    p_cnn = float(p_cnn.numpy()[0])

# ===== LR / STACK BRANCH =====
X_mm = model['mm_scaler'].transform(X)
X_pc = model['pca'].transform(X_mm)

p_lr = float(
    model['stacking_model']
    .named_estimators_['lr']
    .predict_proba(X_pc)[0][1]
)

# ===== SMART MERGE =====
if p_lr < 0.2 or p_lr > 0.8:
    final_prob = p_lr
else:
    final_prob = 0.7 * p_lr + 0.3 * p_cnn

# ===== FINAL DECISION =====
threshold = 0.7
label = "FAKE" if final_prob >= threshold else "REAL"

# ===== OUTPUT JSON =====
output = {
    "prediction": int(final_prob >= threshold),
    "label": label,
    "probability": float(final_prob),

    # 🔥 CNN ACTIVATIONS
    "activations": {
        "block1": act1.squeeze(0).numpy().max(axis=1).tolist(),
        "block2": act2.squeeze(0).numpy().max(axis=1).tolist(),
        "block3": act3.squeeze(0).numpy().flatten().tolist()
    },

    # 🔥 FEATURE VECTOR
    "features": X.flatten().tolist()
}

print(json.dumps(output))