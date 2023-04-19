from sklearn.externals import joblib
from sklearn_porter import Porter

# Load the model from the .sav file
model = joblib.load('npk.sav')

# Convert the model to a JavaScript file
porter = Porter(model, language='js')
output = porter.export(embed_data=True)

# Write the output to a JavaScript file
with open('npk.js', 'w') as f:
    f.write(output)