from django.shortcuts import render
from rest_framework import status
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .serializer import TwitterProfilingSerializer, TwitterSNASerializer, FbSNASerializer, FbProfilingSerializer, TwitterLogSerializer, FbLogSerializer
from .twitterSNA import twitter_sna
from .twitterProfiling import twitter_cyber
import os
import random
import string
from django.http import HttpResponse
from django.template.loader import get_template
from xhtml2pdf import pisa
from io import BytesIO
from .profiling_report import create_report
from mlModels.mailing import send_email
from .mailing import send_mail
from .Fbprofiling import *
from .FbSna import SNA
from csv import writer
from datetime import datetime
import schedule
import time
from Scweet.scweet import scrape
import datetime as DT

# Create your views here.


def code_generate(length):  # define the function and pass the length as argument
    # Print the string in Lowercase
    result = ''.join((random.choice(string.ascii_lowercase)
                     for x in range(length)))  # run loop until the define length
    print(" Random string generated in Lowercase: ", result)

    # Print the string in Uppercase
    result1 = ''.join((random.choice(string.ascii_uppercase)
                      for x in range(length)))  # run the loop until the define length
    return result1


@api_view(['POST'])
@permission_classes([IsAdminUser])
def twitterSNAView(request):
    data = request.data
    print(data)
    print(request.FILES)
    csv_file = data['File']
    csv_file_name = data['fileName']
    # filename= {}

    serializer = TwitterSNASerializer(data=data, many=False)
    a = request.user.user_id
    if serializer.is_valid():
        code = code_generate(10)
        print(code)
        twitter_sna(csv_file, csv_file_name, code)
        img_name = csv_file_name.split('.')[0] + '_' + code + '.png'
        neg_post = csv_file_name.split('.')[0] + '_topten_neg_' + code + '.csv'
        # send_email(data['email'], os.path.join(str(settings.MEDIA_ROOT) + '/sna/images/twitter',
        #                                        csv_file_name.split('.')[0] + '_' + code + '.png'),
        #            os.path.join(str(settings.MEDIA_ROOT) + '/sna/data/twitter',
        #                         csv_file_name.split('.')[0] + '_topten_neg_' + code + '.csv'), img_name, neg_post)

        # filename[a] = [{0: csv_file_name.split('.')[0] + '_Sentiments' + '_' + code + '.csv'},
        #                        {1: csv_file_name.split('.')[0] + '_Sarcasm' + '_' + code + '.csv'}]
        # print(filename)
        # fileName = filename[a]
        # sentiment, sarcasam = download(fileName[0][0], fileName[1][1])
        # print(fileName)
        # data = {
        #     'data': serializer.validated_data,
        #     'sentiment': sentiment,
        #     'sarcasam': sarcasam,
        # }
        # print('is valid')
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def twitterProfileView(request):
    data = request.data
    print(data)
    print(request.FILES)
    csv_file = data['File']
    csv_file_name = data['fileName']
    # create_report(os.path.join(str(settings.MEDIA_ROOT) + '/profiling_data/twitter',
    #                                'behindyouskipper_Sentiments_suspects_info_QUMRFJJCCN.csv'),
    #                   os.path.join(str(settings.MEDIA_ROOT) + '/profiling_data/twitter',
    #                                'behindyouskipper_Sentiments_tweets_from_suspects_QUMRFJJCCN.csv'),
    #                   'QUMRFJJCCN',
    #                   'behindyouskipper_Sentiments')

    serializer = TwitterProfilingSerializer(data=data, many=False)
    a = request.user.user_id
    if serializer.is_valid():
        code = code_generate(10)
        print(code)
        user_lists = twitter_cyber(csv_file, csv_file_name, code)
        # create_report(os.path.join(str(settings.MEDIA_ROOT) + '/profiling_data/twitter',
        #                            csv_file_name.split('.')[0] + '_suspects_info' + '_' + code + '.csv'),
        #               os.path.join(str(settings.MEDIA_ROOT) + '/profiling_data/twitter',
        #                            csv_file_name.split('.')[0] + '_tweets_from_suspects' + '_' + code + '.csv'),
        #               code,
        #               csv_file_name.split('.')[0])
        reportFileName = 'SSK-' + \
            csv_file_name.split('.')[0] + '_' + code + '-Profiling-Report.pdf'
        neg_post = csv_file_name.split(
            '.')[0] + '_tweets_from_suspects' + '_' + code + '.csv'
        # send_email(data['email'], os.path.join(str(settings.MEDIA_ROOT) + '/Reports/twitter_profiling', 'SSK-'+csv_file_name.split('.')[0] + '_' + code + '-Profiling-Report.pdf'),
        #            os.path.join(str(settings.MEDIA_ROOT) + '/profiling_data/twitter',
        #                         csv_file_name.split('.')[0] + '_tweets_from_suspects' + '_' + code + '.csv'), reportFileName, neg_post)

        serializer.save()
        user_lists = ['@Siddiquitalks', '@kazimhc19',
                      '@mindless_umar', '@ufr1', '@Saif7219']
        print(len(user_lists))
        if len(user_lists) > 0:
            request.session['user_lists'] = user_lists
            request.session['email'] = data['email']
            request.session['username'] = data['username']
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def twitter_logs(request):
    user_lists = request.session['user_lists']
    email = request.session['email']
    username = request.session['username']
    filename = os.path.join(str(settings.MEDIA_ROOT) +
                            '/logs/twitter', 'twitterLogs.csv')
    if len(user_lists) > 0:
        with open(filename, 'a', newline='') as write_obj:
            csv_writer = writer(write_obj)
            current_date_time = datetime.now()
            for val in user_lists:
                csv_writer.writerow([current_date_time, val])

    data = {
        'email': email,
        'username': username,
    }
    serializer = TwitterLogSerializer(data=data)
    if serializer.is_valid():
        serializer.validated_data['File'] = os.path.join(str(settings.MEDIA_ROOT) +
                                                         '/logs/twitter', 'twitterLogs.csv')
        print('hello')
        serializer.save()
        return Response(serializer.data)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def fbSNAView(request):
    data = request.data
    print(data)
    print(request.FILES)
    csv_file = data['File']
    csv_file_name = data['fileName']

    serializer = FbSNASerializer(data=data, many=False)
    a = request.user.user_id
    if serializer.is_valid():
        code = code_generate(10)
        print(code)
        SNA(csv_file, csv_file_name, code)
        img_name = csv_file_name.split('.')[0] + '_SNAcomplete_' + code + '.pdf'
        send_mail(data['email'], os.path.join(str(settings.MEDIA_ROOT) + '/Reports/fb_sna',
                                                    csv_file_name.split('.')[0] + '_SNAcomplete_' + code + '.pdf'), img_name)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def fbProfilingView(request):
    data = request.data
    print(data)
    print(request.FILES)
    csv_file = data['File']
    csv_file_name = data['fileName']

    serializer = FbProfilingSerializer()(data=data, many=False)
    a = request.user.user_id
    if serializer.is_valid():
        code = code_generate(10)
        print(code)
        # profiler(csv_file, csv_file_name, code)
        # img_name = csv_file_name.split('.')[0] + '_' + code + '.png'
        # neg_post = csv_file_name.split('.')[0] + '_topten_neg_' + code + '.csv'
        # send_email(data['email'], os.path.join(str(settings.MEDIA_ROOT) + '/sna/images/twitter',
        #                                        csv_file_name.split('.')[0] + '_' + code + '.png'),
        #            os.path.join(str(settings.MEDIA_ROOT) + '/sna/data/facebook',
        #                         csv_file_name.split('.')[0] + '_topten_neg_' + code + '.csv'), img_name, neg_post)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def twitter_logs_profile():
    df = pd.read_csv(os.path.join(str(settings.MEDIA_ROOT) +
                     '/logs/twitter', 'twitterLogs.csv'))
    user_list = df['Username']
    days_ago = str(DT.date.today() - DT.timedelta(days=7))
    lst_tweet_data = []
    for i in user_list:
        tweet_data = scrape(since=days_ago, from_account=i,
                            interval=1, filter_replies=True)
        lst_tweet_data.append(tweet_data)

    # concatenate all dataframes list into 1 and form a full dataframe

    all_tweet_data = pd.concat(lst_tweet_data)
    # contains tweets of all suspects from last 7 days if available
    tweets_df = pd.DataFrame(all_tweet_data, columns=[
                             'UserName', 'Embedded_text', 'Likes', 'Retweets', 'Tweet URL'])

    # only for checking file. comment out this line when displaying on report
    tweets_df.to_csv(os.path.join(str(settings.MEDIA_ROOT) +
                     '/logs/twitter', 'twitter_logs_data.csv'), index=False)


