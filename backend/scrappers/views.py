# from django.shortcuts import render
# from .models import SearchWord
# from rest_framework import viewsets
from rest_framework import status
from .serializers import TwitterScrapperSerializer, TwitterScrapperLocationSerializer, FBSerializer_pages, FBSerializer_post, FBSerializer_comments, FBSerializer_groups
from .models import Twitter_Scrapper
from .tweeter_scrapper import tweeter_scrapper, twitter_scrapper_with_location
from .fb_scrapper import scrape_pages, scrape_post, scrape_comments, scrape_group
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

# Create your views here.
from django.core.files import File
from django.conf import settings
from django.http import HttpResponse
import mimetypes
from rest_framework.decorators import api_view
from sentAnalysis.settings import BASE_DIR, MEDIA_ROOT
import random
import string
import os


def code_generate(length):  # define the function and pass the length as argument
    # Print the string in Lowercase
    result = ''.join((random.choice(string.ascii_lowercase)
                     for x in range(length)))  # run loop until the define length
    print(" Random string generated in Lowercase: ", result)

    # Print the string in Uppercase
    result1 = ''.join((random.choice(string.ascii_uppercase)
                      for x in range(length)))  # run the loop until the define length
    return result1


filename = {}


@api_view(['GET'])
@permission_classes([IsAdminUser])
def DownloadPDF_Twitter(request):
    fileName = filename[request.user.user_id]
    print(fileName)
    path_to_file = os.path.join(str(
        settings.MEDIA_ROOT) + '/twitter_scrapper', fileName)
    if os.path.exists(path_to_file):
        with open(path_to_file, 'r', encoding='utf-8') as fh:
            response = HttpResponse(
                fh.read(), content_type="application/force-download")
            response['Content-Disposition'] = 'inline; filename=' + fileName
            return response


@api_view(['GET'])
@permission_classes([IsAdminUser])
def DownloadPDF_Facebook(request):
    fileName = filename[request.user.user_id]
    print(fileName)
    path_to_file = os.path.join(str(
        settings.MEDIA_ROOT) + '/fb_scrapper', fileName)
    if os.path.exists(path_to_file):
        with open(path_to_file, 'r', encoding='utf-8') as fh:
            response = HttpResponse(
                fh.read(), content_type="application/force-download")
            response['Content-Disposition'] = 'inline; filename=' + fileName
            return response
    # path = open(path_to_file, 'r',encoding='utf-8')
    # # Set the mime type
    # response = HttpResponse(path)
    # response['Content-Disposition'] = "attachment; filename=%s" % filename

    # return response


@api_view(['POST'])
@permission_classes([IsAdminUser])
def TwitterScrapperView(request):
    print('data1', request.data)
    data = request.data
    a = request.user.user_id

    serializer = TwitterScrapperSerializer(data=data)
    if serializer.is_valid():
        code = code_generate(10)
        tweeter_scrapper(data['search_word'], int(
            data['tweetCount']), data['start'], data['end'], code)
        filename[a] = data['search_word'] + '_' + code + '.csv'
        serializer.validated_data['search_id'] = a
        serializer.save()
        print(serializer.data)
        scrapper = download(os.path.join(str(
            settings.MEDIA_ROOT) + '/scrappers/twitter', data['search_word'] + '_' + code + '.csv'))
        
        final_data = {
            'data': serializer.data,
            'scrapper': scrapper,
        }

        return Response(final_data, status=status.HTTP_201_CREATED)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def TwitterScrapperLocationView(request):
    print('data1', request.data)
    data = request.data
    a = request.user.user_id

    serializer = TwitterScrapperLocationSerializer(data=data)
    if serializer.is_valid():
        code = code_generate(10)
        twitter_scrapper_with_location(data['search_word'], int(data['tweetCount']), data['start'], data['end'],
                                       data['radius'], data['location'], code)
        filename[a] = data['search_word'] + '_' + code + '.csv'
        serializer.validated_data['search_id'] = a
        serializer.save()
        print(serializer.data)
        scrapper = download(os.path.join(str(
            settings.MEDIA_ROOT) + '/scrappers/twitter', data['search_word'] + '_' + code + '.csv'))
        
        final_data = {
            'data': serializer.data,
            'scrapper': scrapper,
        }

        return Response(final_data, status=status.HTTP_201_CREATED)

    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # else:
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # if serializer.is_valid():
    # print('serializer.data', serializer.data)
    # serializer.save()
    #     data = serializer.data.get('Search')
    #     print('data', data)
    #     # return Response(status=status.HTTP_201_CREATED)
    # return Response(tweeter_scrapper(serializer.data['search_word'], status=status.HTTP_200_OK))
    # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # data = request.data.get('Search')
    # print('iasjx',data)
    # # queryset = SearchWord.objects.get(id=1)
    # print('given search is ',data)
    # serializer_class = SearchWordSerializer(data,many=True)
    # # print('given searialzer is ',serializer_class.data)
    # return Response(tweeter_scrapper(data))


@api_view(['POST'])
@permission_classes([IsAdminUser])
def FacebookPageScrapperView(request):
    data = request.data
    print(data)
    a = request.user.user_id
    serializer = FBSerializer_pages(data=data)
    if serializer.is_valid():
        code = code_generate(10)
        print('check')
        scrape_pages(data['page_name'], data['PostCount_page'], code)
        print('check1')
        filename[a] = data['page_name'] + '_' + code + '_page.csv'
        print('check12')
        serializer.validated_data['search_id'] = a
        serializer.save()
        print(serializer.data)
        scrapper = download(os.path.join(str(settings.MEDIA_ROOT) + '/scrappers/facebook', 
                       data['page_name'] + '_' + code + '_page.csv'))
        
        final_data = {
            'data': serializer.data,
            'scrapper': scrapper,
        }

        return Response(final_data, status=status.HTTP_201_CREATED)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def FacebookPostScrapperView(request):
    data = request.data
    print(data)
    a = request.user.user_id
    serializer = FBSerializer_post(data=data)
    if serializer.is_valid():
        code = code_generate(10)
        scrape_post(data['url_post'], code)
        filename[a] = data['url_post'].split(
            '/')[-2] + '_' + code + '_post.csv'
        serializer.validated_data['search_id'] = a
        serializer.save()
        print(serializer.data)
        scrapper = download(os.path.join(str(settings.MEDIA_ROOT) + '/scrappers/facebook', 
                       data['url_post'].split('/')[-2] + '_' + code + '_post.csv'))
        
        final_data = {
            'data': serializer.data,
            'scrapper': scrapper,
        }

        return Response(final_data, status=status.HTTP_201_CREATED)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def FacebookCommentsScrapperView(request):
    data = request.data
    a = request.user.user_id
    print(data)
    serializer = FBSerializer_comments(data=data)
    if serializer.is_valid():
        code = code_generate(10)
        scrape_comments(data['url_comments'], code)
        filename[a] = data['url_comments'].split(
            '/')[-2] + '_' + code + '_comments.csv'
        serializer.validated_data['search_id'] = a
        serializer.save()
        print(serializer.data)
        scrapper = download(os.path.join(str(settings.MEDIA_ROOT) + '/scrappers/facebook', 
                   data['url_comments'].split('/')[-2] + '_' + code + '_comments.csv'))
        
        final_data = {
            'data': serializer.data,
            'scrapper': scrapper,
        }

        return Response(final_data, status=status.HTTP_201_CREATED)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def FacebookGroupsScrapperView(request):
    data = request.data
    a = request.user.user_id
    print(data)
    serializer = FBSerializer_groups(data=data)
    if serializer.is_valid():
        code = code_generate(10)
        scrape_group(data['group_name'], data['PostCount_group'], code)
        filename[a] = data['group_name'] + '_' + code + '_group.csv'
        serializer.validated_data['search_id'] = a
        serializer.save()
        print(serializer.data)
        scrapper = download(os.path.join(str(settings.MEDIA_ROOT) + '//scrappers/facebook', 
                   data['group_name'] + '_' + code + '_group.csv'))
        
        final_data = {
            'data': serializer.data,
            'scrapper': scrapper,
        }

        return Response(final_data, status=status.HTTP_201_CREATED)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def download(file1):
    f = open(file1, 'r', encoding='utf-8')
    data = f.read()

    print(data)
    return data
