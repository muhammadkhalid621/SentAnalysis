import pandas as pd
import json
import pandas as pd
import networkx as nx
from matplotlib.pyplot import figure
import matplotlib.pyplot as plt 
import matplotlib
matplotlib.use('Agg')
import os
from django.conf import settings
from PIL import Image

def SNApreprocessor(csvfile):
  df = pd.read_csv(csvfile)  
  reactors = df['reactors']

  c1 = '{'
  c2 = '}'
  leftBrace = [pos for pos, char in enumerate(reactors[0]) if char == c1]
  rightBrace = [pos for pos, char in enumerate(reactors[0]) if char == c2]
  finalIndexes = zip(leftBrace, rightBrace)

  stub = []
  for i,j in finalIndexes:
    stub.append(reactors[0][i:j+1])

  finalizedList = []

  for i in range(len(stub)):
    stub[i] = stub[i].replace("\'", "\"")
    try:
      convertedDict = json.loads(stub[i])
      finalizedList.append(convertedDict)
    except:
      pass

  return(pd.DataFrame.from_dict(finalizedList))


def react_colors(x):
    if x < 'like':
        return '#03045E'
    elif x < 'love':
        return '#ae2012'
    elif x < 'care':
        return '#FFCCD5'
    elif x < 'haha':
        return '#FFBA08'
    elif x < 'wow':
        return '#588157'
    elif x < 'sad':
        return '#d3f8e2'
    elif x < 'angry':
        return '#D00000'
    else:
        return '#212529'


def csvfilecorrector(post,assignedPostName):
  post = post.rename(columns={'name': 'To'})
  post = post.assign(From = assignedPostName)
  
  values = ['haha','angry','wow','sad']
  post = post[post['type'].isin(values) == False]
  
  post['edge_color'] = post['type'].apply(react_colors)  
  return post

def postPreprocessor(csvfile):
  # posts = pd.DataFrame()
  posts = []
  for i in csvfile:
    post = SNApreprocessor(i)
    post = csvfilecorrector(post,i[:(len(i))-4])
    # post.to_csv(i[0:5]+'new.csv',index=False)
    posts.append(post)

  posts.append(pd.concat(posts))

  # return (pd.concat(posts),posts)
  return (posts)
  # df.to_csv('ConcatPosts.csv',index=False)
  # return posts
  print('function ran')


def individualPostMaker(Posts, csv_file_name, code):
  for i in range(len(Posts)):
    print(Posts)
    test = nx.from_pandas_edgelist(Posts[i],source='From',target='To')
    # return test
    DistDf = distanceCalculator(test)
    AttrDf = nodeAttr(test)
    
    figure(figsize=(50, 50))
    like = plt.arrow(0,0,0,0,color='#03045E')
    love = plt.arrow(0,0, 0,0,color='#FFB3C1')
    care = plt.arrow(0,0, 0,0,color='#FFCCD5')
    haha = plt.arrow(0,0, 0,0,color='#FFBA08')
    wow = plt.arrow(0,0,0,0,color='#588157')
    sad = plt.arrow(0,0, 0,0,color='#d3f8e2')
    angry = plt.arrow(0,0, 0,0,color='#e85d04')
    
    greaterthan100 = plt.arrow(0,0,0,0,color='#e85d04')
    greaterthan50 = plt.arrow(0,0, 0,0,color='#f72585')
    reactors = plt.arrow(0,0, 0,0,color='#560bad')

    plt.legend([like,love,care,haha,wow,sad,angry,greaterthan100,greaterthan50,reactors],
              ['like','love','care','haha','wow','sad','angry','post with 100+ reactors','post with 50+ reactors','reactors'],prop={'size':20})

    # plt.legend([like,love,care,greaterthan100,greaterthan50,reactors],
              # ['like','love','care','post with 100+ reactors','post with 50+ reactors','reactors'],prop={'size':20})


    layout = nx.kamada_kawai_layout(test)
    nx.draw_networkx(test,pos=layout,with_labels=True,font_size = 10,edge_color=Posts[i]['edge_color'],node_size=AttrDf['node size'],node_color=AttrDf['node color'])
    plt.savefig(os.path.join(str(settings.MEDIA_ROOT) + '/sna/facebook/images',
                                                    csv_file_name.split('.')[0] + '_Post' + str(i) + '_' + code + '.png'),bbox_inches='tight')
    # plt.savefig("Post"+str(i)+".png")

  im_0 = Image.open(os.path.join(str(settings.MEDIA_ROOT) + '/sna/facebook/images',
                                                    csv_file_name.split('.')[0] + '_Post0_' + code + '.png')).convert('RGB')
  im_1 = Image.open(os.path.join(str(settings.MEDIA_ROOT) + '/sna/facebook/images',
                                                    csv_file_name.split('.')[0] + '_Post1_' + code + '.png')).convert('RGB')
  im_2 = Image.open(os.path.join(str(settings.MEDIA_ROOT) + '/sna/facebook/images',
                                                    csv_file_name.split('.')[0] + '_Post2_' + code + '.png')).convert('RGB')
  im_3 = Image.open(os.path.join(str(settings.MEDIA_ROOT) + '/sna/facebook/images',
                                                    csv_file_name.split('.')[0] + '_Post3_' + code + '.png')).convert('RGB')
  im_4 = Image.open(os.path.join(str(settings.MEDIA_ROOT) + '/sna/facebook/images',
                                                    csv_file_name.split('.')[0] + '_Post4_' + code + '.png')).convert('RGB')
  im_5 = Image.open(os.path.join(str(settings.MEDIA_ROOT) + '/sna/facebook/images',
                                                    csv_file_name.split('.')[0] + '_Post5_' + code + '.png')).convert('RGB')
  

  image_list = [im_1,im_2,im_3,im_4,im_5]


  im_0.save(os.path.join(str(settings.MEDIA_ROOT) + '/Reports/fb_sna',
                                                    csv_file_name.split('.')[0] + '_SNAcomplete_' + code + '.pdf'), save_all=True, append_images=image_list)
    # layout = nx.kamada_kawai_layout(test, dist=DistDf.to_dict())
    # nx.draw_networkx(test,pos=layout,with_labels=True,font_size = 10,edge_color=ConcatPosts['edge_color'],node_size=AttrDf['node size'],node_color=AttrDf['node color'])
    # plt.savefig("SNAGraph.png")


def nodeSizeAssigner(x):
    if x >= 100:
      return 550
    elif 100 > x >= 50:
      return 450
    else:
      return 150

def nodeColorAssigner(x):
    if x >= 100:
      return '#e85d04'
    elif 100 > x >= 50:
      return '#f72585'
    else:
      return '#560bad'


def distanceCalculator(test):
  DistDf = pd.DataFrame(index=test.nodes(), columns=test.nodes())
  DistDf = DistDf.fillna(3)
  return (DistDf)

def nodeAttr(test):
  most_imp_link = nx.degree(test)
  columns = ['node', 'degree']
  AttrDf = pd.DataFrame.from_dict(most_imp_link)
  AttrDf.columns = columns
  AttrDf['node size'] = AttrDf['degree'].apply(nodeSizeAssigner)
  AttrDf['node color'] = AttrDf['degree'].apply(nodeColorAssigner)
  return (AttrDf)


def PostSeparator(csvfile, code):
  df = pd.read_csv(csvfile)
  df.dropna(subset = ["reactors"], inplace=True)
  df = df[['post_id','reactors']].head(5)
  sepData = []
  for index, row in df.iterrows():
    
    dff = pd.DataFrame(row)
    df_t = dff.T
    df_t.to_csv(os.path.join(str(settings.MEDIA_ROOT) + '/sna/facebook/data',
                                                    str(df_t.iloc[0]['post_id']) + '_' + code + '.csv'),index=False)
    sepData.append(os.path.join(str(settings.MEDIA_ROOT) + '/sna/facebook/data',
                                                    str(df_t.iloc[0]['post_id']) + '_' + code + '.csv'))
    # df_t.to_csv(str(df_t.iloc[0]['post_id'])+'.csv',index=False)
    # sepData.append(str(df_t.iloc[0]['post_id'])+'.csv')

  return sepData


def SNA(csvfileposts, csv_file_name, code):
  csvfileposts = PostSeparator(csvfileposts, code)
  ConcatPosts = postPreprocessor(csvfileposts)
  individualPostMaker(ConcatPosts, csv_file_name, code)
  # return ConcatPosts,allposts
  

