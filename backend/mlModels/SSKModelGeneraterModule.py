from django.conf import settings
import os
def libraries():
  import tensorflow as tf
  from tensorflow import keras
  from tensorflow.keras.preprocessing.text import Tokenizer
  from tensorflow.keras.preprocessing.sequence import pad_sequences
  import pandas as pd
  import numpy as np
  import json
  from keras.models import model_from_json
  print('import successful')

def sarcasmData():
  import json

  with open(os.path.join(str(settings.MEDIA_ROOT) + '/model_files',"sarcasm.json"), 'r') as f:
    datastore = json.load(f)

  sentences = []
  labels = []
  urls = []
  for item in datastore:
    sentences.append(item['headline'])
    labels.append(item['is_sarcastic'])
    urls.append(item['article_link'])
  print('data loaded')
  return sentences, labels, urls

def sarcasmModel(sentences, labels,vocab_size,embedding_dim,max_length,trunc_type,padding_type,oov_tok,num_epochs):
  import tensorflow as tf
  from tensorflow import keras
  from tensorflow.keras.preprocessing.text import Tokenizer
  from tensorflow.keras.preprocessing.sequence import pad_sequences
  import pandas as pd
  import numpy as np
  
  training_labels = labels
  
  vocab_size = vocab_size
  embedding_dim = embedding_dim
  max_length = max_length
  trunc_type=trunc_type
  padding_type=padding_type
  oov_tok = oov_tok
  # training_size = 20000

  tokenizer = Tokenizer(num_words=vocab_size, oov_token=oov_tok)
  tokenizer.fit_on_texts(sentences)

  word_index = tokenizer.word_index

  training_sequences = tokenizer.texts_to_sequences(sentences)
  training_padded = pad_sequences(training_sequences, maxlen=max_length, padding=padding_type, truncating=trunc_type)

  modelSarcasm = tf.keras.Sequential(
    [
     tf.keras.layers.Embedding(vocab_size,embedding_dim,input_length=max_length),
     tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(64,return_sequences=True)), 
     tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(32)), 
     tf.keras.layers.Dense(64,activation='relu'),
     tf.keras.layers.Dense(1,activation='sigmoid')
    ])

  modelSarcasm.compile(loss='binary_crossentropy',optimizer='adam',metrics=['accuracy'])
  num_epochs = num_epochs

  training_padded = np.array(training_padded)
  training_labels = np.array(training_labels)

  history = modelSarcasm.fit(training_padded, training_labels, epochs=num_epochs, verbose=2) 
  
  #saving the model in json format
  import json
  from keras.models import model_from_json

  json = modelSarcasm.to_json()
  with open(os.path.join(str(settings.MEDIA_ROOT) + '/model_files',"SSK_SarcasmModel.json"),"w") as json_file:
    json_file.write(json)
  modelSarcasm.save_weights(os.path.join(str(settings.MEDIA_ROOT) + '/model_files',"WeightmodelSarcasm.h5"))
  json_file.close()


def sentimentData(dataset):
  import pandas as pd
  
  data = pd.read_csv(dataset)
  data.dropna(inplace=True)
  
  all_positive_tweets = data[data['sentiment'] == 1]
  all_negative_tweets = data[data['sentiment'] == 0]

  pos_content = all_positive_tweets['text'].tolist()
  neg_content = all_negative_tweets['text'].tolist()
  content = pos_content + neg_content
  pos_sentiments = all_positive_tweets['sentiment'].tolist()
  neg_sentiments = all_negative_tweets['sentiment'].tolist()
  sentiments = pos_sentiments + neg_sentiments

  training_size = len(content)
  training_sentences = content[0:training_size]
  training_labels = sentiments[0:training_size]

  return training_sentences,training_labels

def sentimentModel(training_sentences,training_labels,vocab_size,embedding_dim,max_length,trunc_type,padding_type,oov_tok,num_epochs):
  import tensorflow as tf
  from tensorflow import keras
  from tensorflow.keras.preprocessing.text import Tokenizer
  from tensorflow.keras.preprocessing.sequence import pad_sequences
  import pandas as pd
  import numpy as np

  tokenizer = Tokenizer(num_words=vocab_size, oov_token=oov_tok)
  tokenizer.fit_on_texts(training_sentences)

  word_index = tokenizer.word_index

  training_sequences = tokenizer.texts_to_sequences(training_sentences)
  training_padded = pad_sequences(training_sequences, maxlen=max_length, padding=padding_type, truncating=trunc_type)

  modelSentiment = tf.keras.Sequential(
    [
     tf.keras.layers.Embedding(vocab_size,embedding_dim,input_length=max_length),
     tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(64,return_sequences=True)), 
     tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(32)), 
     tf.keras.layers.Dense(64,activation='relu'),
     tf.keras.layers.Dense(1,activation='sigmoid')
    ])

  modelSentiment.compile(loss='binary_crossentropy',optimizer='adam',metrics=['accuracy'])

  num_epochs = num_epochs

  training_padded = np.array(training_padded)
  training_labels = np.array(training_labels)

  history = modelSentiment.fit(training_padded, training_labels, epochs=num_epochs, verbose=2)

  # saving model
  import json
  from keras.models import model_from_json


  json = modelSentiment.to_json()
  with open(os.path.join(str(settings.MEDIA_ROOT) + '/model_files',"SSK_SentimentModel.json"),"w") as json_file:
    json_file.write(json)
  modelSentiment.save_weights(os.path.join(str(settings.MEDIA_ROOT) + '/model_files',"WeightmodelSentiment.h5"))
  json_file.close()


def modelTrainers(dataset,Svocab_size=10000,Sembedding_dim=16,Smax_length=100,Strunc_type='post',Spadding_type='post',Soov_tok="<OOV>",Snum_epochs=1,
                  vocab_size=10000,embedding_dim=16,max_length=100,trunc_type='post',padding_type='post',oov_tok="<OOV>",num_epochs=3
                  ):
  
  sentences, labels, urls = sarcasmData()
  modelSarcasm = sarcasmModel(sentences, labels,Svocab_size,Sembedding_dim,Smax_length,Strunc_type,Spadding_type,Soov_tok,Snum_epochs)
  training_sentences,training_labels = sentimentData(dataset) 
  modelSentiment = sentimentModel(training_sentences,training_labels,vocab_size,embedding_dim,max_length,trunc_type,padding_type,oov_tok,num_epochs)
