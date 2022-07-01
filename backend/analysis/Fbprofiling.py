import pandas as pd
import numpy as np
import ast
from .prediction import sskFBPredictor

def missingCols(df):
  cols = ['id', 'Name','Basic info','Work','Education',
          'Follower_count', 'Places lived','Contact info']

  for col in cols:
    if col in df.columns:
      pass
    else:
      df[col] = np.nan

  finalized_df = df[cols]
  return finalized_df

def profiler(datafile,postfile):
  df = pd.read_csv(datafile)
  finalized_df = missingCols(df)
  postsInfo = pd.read_csv(postfile)
  postsInfo = postsInfo[['username','user_id','user_url','post_id','text','post_url', 'page_id','likes', 'comments','shares']].head(10)
  return finalized_df,postsInfo

def extract_comments(comment_list, csv_file_name):
  results = []

  for i in comment_list:
      post = next(
          get_posts(
              post_urls=[i],
              options={"comments": "generator", "reactions" : True,},
          )
      )
  comments = list(post["comments_full"])
  for comment in tqdm(comments):
        pprint(comment)
        results.append(comment)
        dataset = pd.DataFrame.from_records(results)
        new  = dataset.iloc[:,[0,1,4,6,7,8,9,10,11]]
        new.columns=['comment_id','comment_url','commenter_name','text','comment_time','comment_image','comment_reactors','comment_reactions','comment_reaction_count']
        new.to_csv(os.path.join(str(settings.MEDIA_ROOT) + '/profiling_data/facebook/comments',
                                csv_file_name.split('.')[0] + '_' +  code  + '.csv'), index=False)
        os.path.join(str(settings.MEDIA_ROOT) + '/profiling_data/facebook/comments',
                                csv_file_name.split('.')[0] + '_' +  code  + '.csv')

def extract_profile(profile_data):
  results=[]
  from facebook_scraper import get_profile
  profile_list = profile_data['comment_url']
  for i in profile_list:
    l=get_profile(i.split('/')[-1], followers=25, following=5, Friends=25)

    # for profile in get_profile("syedmaaz.hassan.33", followers=25, following=5, Friends=25, credentials=('sskenterprises486@gmail.com', 'unimaginable_TRUE_4_')):
    results.append(l)
    #     print(post)
  dataset = pd.DataFrame.from_records(results)
  dataset.to_csv(str(settings.MEDIA_ROOT) + '/profiling_data/facebook/profile',
                                csv_file_name.split('.')[0] + '_' +  code  + '.csv', index=False)

def profiler(csv_file, csv_file_name, code):
  df = pd.read_csv(csv_file)
  comment_list = list(df['post_url'])
  extract_comments(comment_list, csv_file_name)
  data = os.path.join(str(settings.MEDIA_ROOT) + '/profiling_data/facebook/comments',
                                csv_file_name.split('.')[0] + '_' +  code  + '.csv')
  sskFBPredictor(data, csv_file_name, code)
  profile_data = pd.read_csv(os.path.join(str(settings.MEDIA_ROOT) + '/profiling_data/facebook/comments',
                       file_name.split('.')[0] + '_' + code + '_NegComments.csv'))
  extract_profile(profile_data)

