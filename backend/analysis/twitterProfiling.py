def twitter_cyber(filename, csv_file_name, code):

    # importing necessary libraries

    from Scweet.scweet import scrape
    import datetime as DT
    from Scweet.user import get_user_information, get_users_following, get_users_followers
    import numpy as np
    import pandas as pd
    import os
    from django.conf import settings
    from .profiling_report import create_report
    print('import done')

    # importing file and sorting with polarity small to high and select first then tweets

    data_p = pd.read_csv(filename)
    data_p = data_p.sort_values(by='Polarity', ascending=True)
    df_p = data_p.head(5)
    len(df_p)

    # putting all users into a list and adding @ symbol

    df_users_p = df_p[['user_name']]
    df_users_p.reset_index(drop=True, inplace=True)
    users_list_p = df_users_p['user_name'].tolist()
    users_p = []
    for i in users_list_p:
        users_p.append('@'+i)
    print("all main users: ", users_p)

    # get info of all 5 users and make a dataframe

    users_info = get_user_information(users_p, headless=True)
    print(users_info)
#     users_info_df = pd.DataFrame(users_info, columns=["Username","no of following", "no of followers", "join date",
#                                                     "birthdate", "location", "website", "description"]).T
# #     print(users_info_df.head())
#     # only for checking file. comment out this line when displaying on report
#     users_info_df.to_csv(os.path.join(str(settings.MEDIA_ROOT) + '/profiling_data/twitter',
#                                             csv_file_name.split('.')[0] + '_suspects_info' + '_' + code + '.csv'), index=False)

    
    # cyber profiling suspect info complete

    # cyber profiling suspects tweets part start

    # get tweets of suspects from last 7 days

    days_ago = str(DT.date.today() - DT.timedelta(days=7))
    lst_tweet_data = []
    for i in users_p:
        tweet_data = scrape(since=days_ago, from_account=i,
                            interval=1, filter_replies=True)
        lst_tweet_data.append(tweet_data)

    # concatenate all dataframes list into 1 and form a full dataframe

    all_tweet_data = pd.concat(lst_tweet_data)
    # contains tweets of all suspects from last 7 days if available
    tweets_df = pd.DataFrame(all_tweet_data, columns=[
                             'UserName', 'Embedded_text', 'Likes', 'Retweets', 'Tweet URL'])

    # only for checking file. comment out this line when displaying on report
    tweets_df.to_csv(os.path.join(str(settings.MEDIA_ROOT) + '/profiling_data/twitter',
                                            csv_file_name.split('.')[0] + '_tweets_from_suspects' + '_' + code + '.csv'), index=False)
    
    cust_counts = tweets_df['UserName'].value_counts()
    cust_list = cust_counts[cust_counts > 0].index.tolist()
    print(cust_list)
    li = []
#     df_new = tweets_df[tweets_df['Embedded_text'].notnull()]
    # tweets_df['Embedded_text'] = tweets_df['Embedded_text'].apply(
    #     lambda x: x.rsplit(maxsplit=5)[:5])
    tweets_df['Embedded_text'] = tweets_df['Embedded_text'].apply(lambda x: ' '.join(x.split(maxsplit=5)[:5]))
    for i in range(len(cust_list)):
        li.append(tweets_df[['Embedded_text', 'Tweet URL']]
                  [tweets_df['UserName'] == cust_list[i]].values.tolist())
    print(li)

    l = []
    for key, value in users_info.items():
        b = []
        temp = [value]
        a = list(value)
        print(a[1])
        b.append(['username', key])
        b.append(['no of following', value[0]])
        b.append(['no of followers', value[1]])
        b.append(['join date', value[2]])
        b.append(['birthdate', value[3]])
        b.append(['location', value[4]])
        b.append(['website', value[5]])
        b.append(['description', value[6][0:30]])
        l.append(b)

    print(l)

    create_report(l, li, code, csv_file_name.split('.')[0], cust_list)
    return users_p