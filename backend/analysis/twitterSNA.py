def twitter_sna(filename, csv_file_name, code):

    # importing necessary libraries

    from Scweet.scweet import scrape
    from Scweet.user import get_user_information, get_users_following, get_users_followers
    import numpy as np
    import pandas as pd
    import networkx as nx
    import matplotlib.pyplot as plt
    import os
    from django.conf import settings
    from dotenv import load_dotenv
    load_dotenv()
    print('import done')
    # importing file and sorting with polarity small to high and select first then tweets

    data = pd.read_csv(filename)
    data = data.sort_values(by='Polarity', ascending=True)
    df = data.head(10)
    print(len(df))
    df.to_csv(os.path.join(str(settings.MEDIA_ROOT) + '/sna/twitter/data',
                                                    csv_file_name.split('.')[0] + '_topten_neg_' + code + '.csv'), index=False)

    # separate users with followers greater than less than 500 and putting them in list

    lt_500 = df[(df.user_followers < 500)]
    lt_500_list = lt_500['user_name'].tolist()
    print(lt_500_list)
    print('followers less than 500 suspects count: ', len(lt_500_list))
    gte_500 = df[(df.user_followers >= 500)]
    gte_500_list = gte_500['user_name'].tolist()
    print('followers greater than or equal to 500 suspects count: ', len(gte_500_list))

    # putting all users into a list

    df_users = df[['user_name']]
    df_users.reset_index(drop=True, inplace=True)
    users_list = df_users['user_name'].tolist()
    print("this is all users list: ", users_list)

    # putting @ symbol before every user name

    users = []
    for i in users_list:
        users.append('@'+i)
    print("all main users: ", users)

    lt_500_users = []
    for i in lt_500_list:
        lt_500_users.append('@'+i)
    print("all users with followers less than 500: ", lt_500_users)

    gte_500_users = []
    for i in gte_500_list:
        gte_500_users.append('@'+i)
    print("all users with followers greater than or equal to 500: ", gte_500_users)

    # env file contains my pass and username for scrapping

    env_path = os.getenv(".env")
    print(env_path)

    # code for scraping 5 followers of the given 10 usernames

    followers = get_users_followers(
        users=users, env=env_path, verbose=0, headless=True, wait=10, limit=5, file_path='output')
    print(followers)

    # creating edge list

    edge_output = []
    # loop through the keys of the dictionary
    for key in followers:
        # iterate through set
        for i in followers[key]:
            edge_output.append((key, i))
    edge = pd.DataFrame(edge_output, columns=['Source', 'Target'])
    print(edge.head())

    # all users list
    all_users = list(followers.keys())
    print('this is all users list: ', all_users)

    # NETWORKX

    # create figure
    fig, ax = plt.subplots(figsize=(25, 32))

    # create graph object
    G = nx.Graph()

    # add edge information to the graph
    for a, b in edge.itertuples(index=False):
        G.add_edge(a, b)

    # lists for graphs stylings

    big_size = []
    color = []
    styling = []
    for l in G.nodes():
        if l in all_users:
            big_size.append(5000)
            color.append('orange')
        else:
            big_size.append(2000)
            color.append('lightblue')
    for s in G.edges():
        if s[0] in lt_500_users:
            styling.append("dashed")
        else:
            styling.append("solid")

    # visualize this

    nx.draw_planar(G, with_labels=True, edgecolors='blue', node_color=color, node_size=big_size, width=3, edge_color='blue',
                   font_size=18, style=styling)

    # for legend box

    arr1 = plt.arrow(0, 0, 0, 0, color='orange')

    arr2 = plt.arrow(0, 0, 0, 0, color='lightblue')
    arr3 = plt.arrow(0, 0, 0, 0, color='b')
    arr4 = plt.arrow(0, 0, 0, 0, color='b')

    plt.legend([arr1, arr2, arr3, arr4],
               ['Suspect users', 'Followers', '----- (less than 500 followers)', 'greater than 500 followers'], prop={'size': 20})
    plt.title("Twitter SNA for Suspects & its Followers", fontsize=40)
    plt.savefig(os.path.join(str(settings.MEDIA_ROOT) + '/sna/twitter/images',
                                                    csv_file_name.split('.')[0] + '_' + code + '.png'))

    print('Twitter SNA DONE')
