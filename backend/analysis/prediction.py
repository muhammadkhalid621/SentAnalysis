

import os
from django.conf import settings

def library_importer():
  import tensorflow as tf
  from tensorflow import keras
  from tensorflow.keras.preprocessing.text import Tokenizer
  from tensorflow.keras.preprocessing.sequence import pad_sequences
  import pandas as pd
  import numpy as np
  import json
  from keras.models import model_from_json

  import re
  import string
  from nltk.corpus import stopwords
  from nltk.stem import PorterStemmer
  import nltk
  nltk.download('stopwords')
  from os import getcwd


  return tf, keras, Tokenizer, pad_sequences, pd, np, model_from_json, re, string, stopwords, PorterStemmer, getcwd 
  # print('import successful')    for debugging

def process_tweet(tweet,re, string, stopwords, PorterStemmer):

    """Process tweet function.
    Input:
        tweet: a string containing a tweet
    Output:
        tweets_clean: a list of words containing the processed tweet
    """
    stemmer = PorterStemmer()
    stopwords_english = stopwords.words('english')
    # remove stock market tickers like $GE
    
    tweet = re.sub(r'\$\w*', '', tweet)
    # remove old style retweet text "RT"
    tweet = re.sub(r'^RT[\s]+', '', tweet)
    # remove hyperlinks
    tweet = re.sub(r'https?:\/\/.*[\r\n]*', '', tweet)
    tweet = re.sub(r'http.?://[^\s]+[\s]?', '',tweet)
    # tweet = re.sub("[^a-zA-Z]", " ",str(tweet))
    # remove hashtags
    # only removing the hash # sign from the word
    tweet = re.sub(r'#', '', tweet)
    tweet = re.sub(r'@', '', tweet)
    
    # print('process tweet function done')   ############### for debugging
    return tweet

def tokeizeAndPad(cleaned_tweets,Tokenizer, pad_sequences):
  vocab_size = 10000
  embedding_dim = 16
  max_length = 100
  trunc_type='post'
  padding_type='post'
  oov_tok = "<OOV>"
  tokenizer = Tokenizer(oov_token='<OOV>')

  tokenizer = Tokenizer(num_words=vocab_size, oov_token=oov_tok)
  tokenizer.fit_on_texts(cleaned_tweets)

  tst_seq = tokenizer.texts_to_sequences(cleaned_tweets)
  # print('this is the length of tst_seq',len(tst_seq))               for debugging
  tst_pad = pad_sequences(tst_seq, maxlen = max_length,padding=padding_type,truncating=trunc_type)
  # print('this is the length of tst_seq',len(tst_pad))               for debugging
  return tst_pad

def sentimentPredictions(df,cleanTweets,tf, keras, Tokenizer, pad_sequences, pd, np,model_from_json):
  
  clean_tweets = cleanTweets
  json = open(os.path.join(str(settings.MEDIA_ROOT) +
                '/model_files', 'SSK_SentimentModel.json'),'r').read()
  modelSentiment = model_from_json(json)
  modelSentiment.load_weights(os.path.join(
        str(settings.MEDIA_ROOT) + '/model_files', "WeightmodelSentiment.h5"))
  # json.close()


  tst_pad = tokeizeAndPad(clean_tweets,Tokenizer, pad_sequences)
  # print('this is the length of tst_seq',len(tst_pad))               for debugging
  tst_pred = modelSentiment.predict(tst_pad)
  # print('this is the length of tst_seq',len(tst_pred))              for debugging

  sent_y = []
  polarity = []
  for i in tst_pred:
    if abs(i[0]) >= 0.5:
      polarity.append(i[0])
      sent_y.append(1)
    else:
      polarity.append(i[0])
      sent_y.append(0)

  # print(y_hat)
  df['Sentiment'] = sent_y
  df['Polarity'] = polarity
  return df

def Clean_tweets(test_data,re, string, stopwords, PorterStemmer):
  cleaned_tweets = []
  for i in test_data:
    cleaned_tweets.append(process_tweet(i,re, string, stopwords, PorterStemmer))
  return cleaned_tweets

def sskFBPredictor(data, file_name, code):
  tf, keras, Tokenizer, pad_sequences, pd, np, model_from_json, re, string, stopwords, PorterStemmer, getcwd = library_importer()

  df = pd.read_csv(data)
  df = df.dropna(subset=['text'])
  df.drop_duplicates(subset ="text",keep = False, inplace = True)
  
  test_data = list(df['text'])
  clean_tweets = Clean_tweets(test_data,re, string, stopwords, PorterStemmer)
  df = sentimentPredictions(df,clean_tweets,tf, keras, Tokenizer, pad_sequences, pd, np,model_from_json)
  # df.to_csv(data[:(len(data)) - 4] + 'PostSentiments.csv', index=False)
  # return df
  PosPosts = df[df['Sentiment'] == 1]
  NegPosts = df[df['Sentiment'] == 0]
  
  NegPosts.to_csv(os.path.join(str(settings.MEDIA_ROOT) + '/profiling_data/facebook/comments',
                       file_name.split('.')[0] + '_' + code + '_NegComments.csv'),index=False)

  # return (PosPosts,NegPosts)
  print('its working bubbles :)')     #for debugging
