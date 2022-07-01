# import os
# import tweepy as tw
# import pandas as pd
# from tqdm import tqdm, notebook
# import tweepy
# import csv
# import tweepy
# from tweepy import Stream
# from tweepy.streaming import Stream
# from tweepy import OAuthHandler


# def tweeter_scrapper(search_words):
#     pd.set_option('display.max_columns', None)
#     pd.set_option('display.max_rows', None)
#     pd.set_option('display.max_colwidth', None)
#     pd.set_option('display.width', None)

#     consumer_key = '8ftQLZe8GzfrpDTTSYpyRd3r2'
#     consumer_secret = 'qawaTwbFEYSO1HQkFzAHWDUPV2D6bK5RJ2J5GLsjNQij8TtSCV'
#     access_token = '1321856943972110343-viKhbyEnj1P1BQ7xZf7ZeFEbYCmKDi'
#     access_token_secret = 'xUbAdm5nhQDTPno0JGofV4xJGJQNDeKcqT4ouL8Ym8mtP'

#     auth = tw.OAuthHandler(consumer_key, consumer_secret)

#     api = tw.API(auth, wait_on_rate_limit=True)

#     print(search_words)
#     # date_since = "2020-03-01"
#     # coordinates = '21.7679,78.8718,900km'
#     # # Collect tweets
#     # tweets = tw.Cursor(api.search_tweets,
#     #             q=search_words,
#     #             lang="en",geocode=coordinates).items(150)
#     tweets = tw.Cursor(api.search_tweets,
#                        q=search_words,
#                        lang="en").items(150)
#     tweets_copy = []
#     for tweet in tqdm(tweets):
#         tweets_copy.append(tweet)

#     tweets_df = pd.DataFrame()
#     for tweet in tqdm(tweets_copy):
#         hashtags = []
#         try:
#             for hashtag in tweet.entities["hashtags"]:
#                 hashtags.append(hashtag["text"])
#             text = api.get_status(id=tweet.id, tweet_mode='extended').full_text
#         except:
#             pass

#         tweets_df = tweets_df.append(pd.DataFrame({
#             'user_id': tweet.id,
#             'retweet-count': tweet.retweet_count,
#             'user_screen_name': tweet.user.screen_name,
#             'user_name': tweet.user.name,
#             'user_ location': tweet.user.location,
#             'user_description': tweet.user.description,
#             "Geo: ": tweet.geo,
#             'coordinates': [tweet.coordinates],
#             'user_created': tweet.user.created_at,
#             'user_followers': tweet.user.followers_count,
#             'user_friends': tweet.user.friends_count,
#             'user_favourites': tweet.user.favourites_count,
#             'user_verified': tweet.user.verified,
#             'date': tweet.created_at,
#             'text': text,
#             'hashtags': [hashtags if hashtags else None],
#             'source': tweet.source,
#             'place': tweet.place,
#             'is_retweet': tweet.retweeted}, index=[0]))

#     tweets_all_df = pd.concat([tweets_df], axis=0)
#     tweets_all_df.drop_duplicates(
#         subset=["user_name", "date", "text"], inplace=True)
#     print(f"all tweets: {tweets_all_df.shape}")
#     print(search_words)
#     tweets_all_df.to_csv("{0}.csv".format(search_words), index=False)
#     df = pd.read_csv("{0}.csv".format(search_words))
#     # "{0}.csv".format(search_words)

import csv
import snscrape.modules.twitter as sntwitter
import pandas as pd
import itertools
from django.conf import settings
import os


def tweeter_scrapper(text, numberOfTweets, start, end, code):

    # Creating list to append tweet data to
    tweets_list = []

    # Using TwitterSearchScraper to scrape data and append tweets to list
    for i, tweet in enumerate(sntwitter.TwitterSearchScraper(
            '{text} since:{start} until:{end}'.format(text=text, start=start, end=end)).get_items()):
        if i > numberOfTweets:
            break
        tweets_list.append([tweet.date, tweet.id, tweet.content, tweet.url, tweet.renderedContent,
                            tweet.user.username, tweet.user.followersCount, tweet.replyCount,
                            tweet.retweetCount, tweet.likeCount, tweet.quoteCount, tweet.lang, tweet.conversationId,
                            tweet.outlinks, tweet.media, tweet.retweetedTweet, tweet.quotedTweet,
                            tweet.inReplyToTweetId, tweet.inReplyToUser, tweet.mentionedUsers,
                            tweet.coordinates, tweet.place, tweet.hashtags, tweet.cashtags, tweet.mentionedUsers,
                            tweet.outlinks, tweet.tcooutlinks, tweet.sourceLabel])
    # Creating a dataframe from the tweets list above
    tweets_df = pd.DataFrame(tweets_list,
                             columns=['date', 'user_id', 'text', 'url', 'renderedContent',
                                      'user_name', 'user_followers', 'replyCount',
                                      'retweet-count', 'likeCount', 'quoteCount', 'lang',
                                      'conversationId',
                                      'outlinks', 'source', 'is_retweet', 'quotedTweet',
                                      'inReplyToTweetId', 'inReplyToUser', 'mentionedUsers',
                                      'coordinates', 'user_location', 'hashtags', 'cashtags',
                                      'mentionedUsers', 'outlinks',
                                      'tcooutlinks', 'sourceLabel'])

    tweets_all_df = pd.concat([tweets_df], axis=0)
    tweets_all_df.to_csv(os.path.join(str(
        settings.MEDIA_ROOT) + '/scrappers/twitter', text + '_' + code + '.csv'), index=False)


def twitter_scrapper_with_location(text, numberOfTweets, start, end, radius, location, code):
    # Creating list to append tweet data to
    tweets_list = []

    # Using TwitterSearchScraper to scrape data and append tweets to list
    for i, tweet in enumerate(sntwitter.TwitterSearchScraper(
            '{text} since:{start} until:{end} near:{location} within:{radius}'.
            format(text=text, start=start, end=end, location=location, radius=radius+'km')).get_items()):
        if i > numberOfTweets:
            break
        tweets_list.append([tweet.date, tweet.id, tweet.content, tweet.url, tweet.renderedContent,
                            tweet.user.username, tweet.user.followersCount, tweet.replyCount,
                            tweet.retweetCount, tweet.likeCount, tweet.quoteCount, tweet.lang, tweet.conversationId,
                            tweet.outlinks, tweet.media, tweet.retweetedTweet, tweet.quotedTweet,
                            tweet.inReplyToTweetId, tweet.inReplyToUser, tweet.mentionedUsers,
                            tweet.coordinates, tweet.place, tweet.hashtags, tweet.cashtags, tweet.mentionedUsers,
                            tweet.outlinks, tweet.tcooutlinks, tweet.sourceLabel])
    # Creating a dataframe from the tweets list above
    tweets_df = pd.DataFrame(tweets_list,
                             columns=['date', 'user_id', 'text', 'url', 'renderedContent',
                                      'user_name', 'user_followers', 'replyCount',
                                      'retweet-count', 'likeCount', 'quoteCount', 'lang',
                                      'conversationId',
                                      'outlinks', 'source', 'is_retweet', 'quotedTweet',
                                      'inReplyToTweetId', 'inReplyToUser', 'mentionedUsers',
                                      'coordinates', 'user_location', 'hashtags', 'cashtags',
                                      'mentionedUsers', 'outlinks',
                                      'tcooutlinks', 'sourceLabel'])

    tweets_all_df = pd.concat([tweets_df], axis=0)
#     tweets_all_df['user_location'] =  tweets_all_df['user_location'].apply(lambda x: x['country'])
    tweets_all_df.to_csv(os.path.join(str(
        settings.MEDIA_ROOT) + '/scrappers/twitter', text + '_' + code + '.csv'), index=False)
