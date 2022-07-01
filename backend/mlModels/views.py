from rest_framework import status
from django.conf import settings
from .serializers import TwitterModelSerializer, FbModelSerializer, TrainModelSerializer, ModelTainingFileSerializer, TwitterModelClientSerializer, FbModelClientSerializer
from .models import TwitterModel
from .mailing import send_email
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .SSKModelGeneraterModule import modelTrainers
from .PredictionModuleAdminClient import sskPredictor
from .FBPrediction import sskFBPredictor
from .ReportAnalysis import generateReport
from .locationModule import mapCreator
from django.http import HttpResponse
import csv
import json
import pandas as pd
import os
import time
import random
import string

# Create your views here.


@api_view(['GET'])
@permission_classes([IsAdminUser])
def DownloadPDF(request):
    filename = {}
    fileName = filename[request.user.user_id]
    path_to_file_sent = os.path.join(str(
        settings.MEDIA_ROOT) + '/predict_files', fileName[0][0])
    path_to_file_sar = os.path.join(str(
        settings.MEDIA_ROOT) + '/predict_files', fileName[1][1])

    # with open(path_to_file_sent, 'r', encoding='utf-8') as fh:
    #             print(fh.read())
    #             sentiment = fh.read()
    f0 = open(path_to_file_sent, 'r', encoding='utf-8')
    sentiment = f0.read()
    # response = HttpResponse(
    #     fh.read(), content_type="application/force-download")
    # response['Content-Disposition'] = 'inline; filename=' + fileName[0][0]
    # sentiment = response['Content-Disposition']
    # return sentiment

    f1 = open(path_to_file_sar, 'r', encoding='utf-8')
    sarcasam = f1.read()
    # response = HttpResponse(
    #     fh.read(), content_type="application/force-download")
    # response['Content-Disposition'] = 'inline; filename=' + fileName[1][1]
    # sarcasam = response['Content-Disposition']
    # return sarcasam

    data = {
        'sentiment': sentiment,
        'sarcasam': sarcasam,
    }

    # print(data)
    return Response(data)

    # for i in range(len(fileName)):
    #     print(fileName[i][i])
    #     path_to_file = os.path.join(str(
    #         settings.MEDIA_ROOT) + '/twitter_scrapper', fileName[i][i])
    #     if os.path.exists(path_to_file):
    #         with open(path_to_file, 'r', encoding='utf-8') as fh:
    #             print(fh.read())
    #             response = HttpResponse(
    #                 fh.read(), content_type="application/force-download")
    #             response['Content-Disposition'] = 'inline; filename=' + fileName[i][i]
    #             return response


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
@permission_classes([IsAuthenticated, IsAdminUser])
def TwitterModelView(request):
    parser_classes = [MultiPartParser, FormParser, ]
    data = request.data
    print(data)
    print(request.FILES)
    csv_file = data['File']
    csv_file_name = data['fileName']
    print(csv_file)
    filename = {}
    # print('file',os.path.splitext(os.path.split(csv_file_name)[1])[0])
    # print(serializer.is_valid())

    # data['reportFile'] = 'SSK-'+csv_file_name+'-Analysis-Report.pdf'
    # data['']
    # print(str(csv_file_name.split('.')[0]) + '_' + str(time.time()) + '.csv')
    # data['File'] = str(csv_file_name.split('.')[0]) + '_' + str(time.time()) + '.csv'
    serializer = TwitterModelSerializer(data=data)
    a = request.user.user_id
    if serializer.is_valid():
        code = code_generate(10)
        print(code)
        # code_check = FileUpload.objects.filter(code=code).order_by('-email')
        # print(code_check)
        # for i in range(len(code_check)):

        #     if code_check[i]['code'] == code:
        #         code =code_generate(10)
        serializer.validated_data['code'] = code

        dataset = pd.read_csv(csv_file)
        if not (dataset.count().sum() == 0):
            if data['option'] == 'Report':
                generateReport(dataset, data['username'], csv_file_name.split('.')[
                    0], data['email'], code)

                reportFileName = 'SSK-' + \
                    csv_file_name.split('.')[0]+'_' + \
                    code + '-Analysis-Report.pdf'
                mapFileName = csv_file_name.split(
                    '.')[0]+'_' + code + '_visualizationMap.html'
                if not (dataset['coordinates'].count().sum() == 0):
                    print('hello', (dataset['coordinates'].empty))
                    mapCreator(dataset, csv_file_name, code)
                    # send_email(data['email'], os.path.join(str(settings.MEDIA_ROOT) + '/Reports/twitter_model', 'SSK-'+csv_file_name.split('.')[
                    #     0]+'_' + code + '-Analysis-Report.pdf'),
                    #     os.path.join(str(settings.MEDIA_ROOT) + '/twitter_model_map', csv_file_name.split('.')[
                    #         0].split('.')[0]+'_' + code + '_visualizationMap.html'), reportFileName, mapFileName)
                    print('is valid')
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)

                else:
                    print('why')
                    return Response('The coordinates column in the dataset is Empty.',
                                    status=status.HTTP_400_BAD_REQUEST)

            if data['option'] == 'Prediction':
                sskPredictor(dataset, csv_file_name, code)
                filename[a] = [{0: os.path.join(str(settings.MEDIA_ROOT) + '/predict_files/twitter',
                                                csv_file_name.split('.')[0] + '_Sentiments' + '_' + code + '.csv')},
                               {1: os.path.join(str(settings.MEDIA_ROOT) + '/predict_files/twitter',
                                                csv_file_name.split('.')[0] + '_Sarcasm' + '_' + code + '.csv')}]
                print(filename)
                fileName = filename[a]
                sentiment, sarcasam = download(fileName[0][0], fileName[1][1])
                print(fileName)
                data = {
                    'data': serializer.validated_data,
                    'sentiment': sentiment,
                    'sarcasam': sarcasam,
                }
                print('is valid')
                serializer.save()
                return Response(data, status=status.HTTP_201_CREATED)
                # filename.append({filename[a] : {0 : csv_file_name.split('.')[0] + '_Sentiments' + code +  '.csv'},
                # {1:csv_file_name.split('.')[0] + '_Sentiments' + code +  '.csv'}})

            if data['option'] == 'Both':
                sskPredictor(dataset, csv_file_name, code)
                print(csv_file_name.split('.')[
                    0]+'_Sentiments.csv', data['username'], csv_file_name.split('.')[0], data['email'], code)
                filename[a] = [{0: os.path.join(str(settings.MEDIA_ROOT) + '/predict_files/twitter',
                                                csv_file_name.split('.')[0] + '_Sentiments' + '_' + code + '.csv')},
                               {1: os.path.join(str(settings.MEDIA_ROOT) + '/predict_files/twitter',
                                                csv_file_name.split('.')[0] + '_Sarcasm' + '_' + code + '.csv')}]
                print(filename)
                datasets = pd.read_csv(os.path.join(str(settings.MEDIA_ROOT) + '/predict_files/twitter',
                                                    csv_file_name.split('.')[0] + '_Sentiments' + '_' + code + '.csv'))
                generateReport(datasets, data['username'], csv_file_name.split('.')[
                               0], data['email'], code)
                # mapCreator(csv_file_name.split('.')[
                #         0]+'_Sentiments.csv', csv_file_name, code)
                reportFileName = 'SSK-' + \
                    csv_file_name.split('.')[0]+'_' + \
                    code + '-Analysis-Report.pdf'
                mapFileName = csv_file_name.split(
                    '.')[0]+'_' + code + '_visualizationMap.html'
                if not (dataset['coordinates'].count().sum() == 0):
                    print('hello', (dataset['coordinates'].empty))
                    mapCreator(datasets, csv_file_name, code)
                    # send_email(data['email'], os.path.join(str(settings.MEDIA_ROOT) + '/Reports/twitter_model', 'SSK-'+csv_file_name.split('.')[
                    #     0]+'_' + code + '-Analysis-Report.pdf'),
                    #     os.path.join(str(settings.MEDIA_ROOT) + '/twitter_model_map', csv_file_name.split('.')[
                    #         0].split('.')[0]+'_' + code + '_visualizationMap.html'), reportFileName, mapFileName)

                    print(filename)
                    fileName = filename[a]
                    sentiment, sarcasam = download(
                        fileName[0][0], fileName[1][1])
                    print(fileName)
                    data = {
                        'data': serializer.validated_data,
                        'sentiment': sentiment,
                        'sarcasam': sarcasam,
                    }
                    print('is valid')
                    serializer.save()
                    return Response(data, status=status.HTTP_201_CREATED)

                else:
                    print('why')
                    return Response('The coordinates column in the dataset is Empty.',
                                    status=status.HTTP_400_BAD_REQUEST)

            # serializer.validated_data['File'] = os.path.join(str(settings.MEDIA_ROOT) + '/predict_dataset', csv_file_name.split('.')[0] + code + csv_file_name.split('.')[-1])

        else:
            return Response('The dataset is Empty.',
                            status=status.HTTP_400_BAD_REQUEST)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def FbModelView(request):
    parser_classes = [MultiPartParser, FormParser, ]
    data = request.data
    print(data)
    print(request.FILES)
    csv_file = data['File']
    csv_file_name = data['fileName']
    print(csv_file)
    filename = {}

    serializer = FbModelSerializer(data=data)
    a = request.user.user_id
    if serializer.is_valid():
        code = code_generate(10)
        print(code)
        # code_check = FileUpload.objects.filter(code=code).order_by('-email')
        # print(code_check)
        # for i in range(len(code_check)):

        #     if code_check[i]['code'] == code:
        #         code =code_generate(10)
        serializer.validated_data['code'] = code

        sskFBPredictor(csv_file, csv_file_name, code)
        filename[a] = [{0: os.path.join(str(settings.MEDIA_ROOT) + '/predict_files/facebook',
                                        csv_file_name.split('.')[0] + '_' + code + '_PosPosts.csv')},
                       {1: os.path.join(str(settings.MEDIA_ROOT) + '/predict_files/facebook',
                                        csv_file_name.split('.')[0] + '_' + code + '_NegPosts.csv')}]
        print(filename)
        fileName = filename[a]
        sentiment, sarcasam = download(fileName[0][0], fileName[1][1])
        print(fileName)
        data = {
            'data': serializer.validated_data,
            'sentiment': sentiment,
            'sarcasam': sarcasam,
        }
        print('is valid')
        serializer.save()
        return Response(data, status=status.HTTP_201_CREATED)
        # filename.append({filename[a] : {0 : csv_file_name.split('.')[0] + '_Sentiments' + code +  '.csv'},
        # {1:csv_file_name.split('.')[0] + '_Sentiments' + code +  '.csv'}})

    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def TrainModel(request):
    parser_classes = [MultiPartParser, FormParser, ]
    data = request.data
    print(data)
    serializer = TrainModelSerializer(data=data)
    print(request.FILES)
    csv_file = data['File']
    csv_file_name = data['fileName']
    print(csv_file)

    if serializer.is_valid():
        modelTrainers(csv_file)
        print('is valid')
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getFilesID(request):
    admins = FileUpload.objects.all()
    serializer = TwitterModelSerializer(admins, many=True)
    print(serializer.data.id)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def model_train_files(request):
    data = request.data
    serializer = ModelTainingFileSerializer(data=data)

    print(data)
    if serializer.is_valid():
        serializer.validated_data['weight_sarcasm'] = os.path.join(
            str(settings.MEDIA_ROOT) + '/model_files', "SSK_SarcasmModel.json")
        serializer.validated_data['weight_sentiment'] = os.path.join(
            str(settings.MEDIA_ROOT) + '/model_files', "SSK_SentimentModel.json")
        serializer.validated_data['sarcasm_Model'] = os.path.join(
            str(settings.MEDIA_ROOT) + '/model_files', "WeightmodelSarcasm.h5")
        serializer.validated_data['sentiment_Model'] = os.path.join(
            str(settings.MEDIA_ROOT) + '/model_files', "WeightmodelSentiment.json")
        print('is valid')
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


filename_client = {}


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def DownloadPDF_client(request):
    print(request.user.user_id, request.user.email)
    fileName = filename_client[request.user.user_id]
    path_to_file_sent = os.path.join(str(
        settings.MEDIA_ROOT) + '/predict_files', fileName[0][0])
    path_to_file_sar = os.path.join(str(
        settings.MEDIA_ROOT) + '/predict_files', fileName[1][1])

    # with open(path_to_file_sent, 'r', encoding='utf-8') as fh:
    #             print(fh.read())
    #             sentiment = fh.read()
    f0 = open(path_to_file_sent, 'r', encoding='utf-8')
    sentiment = f0.read()
    # response = HttpResponse(
    #     fh.read(), content_type="application/force-download")
    # response['Content-Disposition'] = 'inline; filename=' + fileName[0][0]
    # sentiment = response['Content-Disposition']
    # return sentiment

    f1 = open(path_to_file_sar, 'r', encoding='utf-8')
    sarcasam = f1.read()
    # response = HttpResponse(
    #     fh.read(), content_type="application/force-download")
    # response['Content-Disposition'] = 'inline; filename=' + fileName[1][1]
    # sarcasam = response['Content-Disposition']
    # return sarcasam

    data = {
        'sentiment': sentiment,
        'sarcasam': sarcasam,
    }

    print(data)
    return Response(data)


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def twitter_predict_client(request):
    data = request.data
    print(data)
    csv_file = data['File']
    csv_file_name = data['fileName']
    a = request.user.user_id
    reportFiles = {}

    serializer = TwitterModelClientSerializer(data=data, many=False)

    if serializer.is_valid():
        print('is_valid')
        code = code_generate(10)
        dataset = pd.read_csv(csv_file)
        if not (dataset.count().sum() == 0):
            sskPredictor(dataset, csv_file_name, code)
            reportFiles[a] = [{0: os.path.join(str(settings.MEDIA_ROOT) + '/predict_files/twitter',
                                            csv_file_name.split('.')[0] + '_Sentiments' + '_' + code + '.csv')},
                           {1: os.path.join(str(settings.MEDIA_ROOT) + '/predict_files/twitter',
                                            csv_file_name.split('.')[0] + '_Sarcasm' + '_' + code + '.csv')}]
            print(reportFiles)

            datasets = pd.read_csv(os.path.join(str(settings.MEDIA_ROOT) + '/predict_files/twitter',
                                                csv_file_name.split('.')[0] + '_Sentiments' + '_' + code + '.csv'))
            totalReach, summaryData = generateReport(datasets, data['username'], csv_file_name.split('.')[
                           0], data['email'], code)
            reportFileName = 'SSK-' + \
                    csv_file_name.split('.')[0]+'_' + \
                    code + '-Analysis-Report.pdf'
            mapFileName = csv_file_name.split(
                    '.')[0]+'_' + code + '_visualizationMap.html'

            if not (dataset['coordinates'].count().sum() == 0):
                print('hello', (dataset['coordinates'].empty))
                mapCreator(dataset, csv_file_name, code)
                # send_email(data['email'], os.path.join(str(settings.MEDIA_ROOT) + '/Reports/twitter_model', 'SSK-'+csv_file_name.split('.')[
                #     0]+'_' + code + '-Analysis-Report.pdf'),
                #     os.path.join(str(settings.MEDIA_ROOT) + '/twitter_model_map', csv_file_name.split('.')[
                #         0].split('.')[0]+'_' + code + '_visualizationMap.html'), reportFileName, mapFileName)
                print('is valid')
                serializer.save()
                fileName = reportFiles[a]
                sentiment, sarcasam = download(fileName[0][0], fileName[1][1])
                print(fileName)
                # totalReach, summaryData = generateReport(
                    # datasets, data['username'], csv_file_name.split('.')[0], data['email'], code)
                images = [
                    'http://localhost:8000' +
                    str(settings.MEDIA_URL) + 'report_images/' +
                    'pieChartReach_' + code + '.png',
                    'http://localhost:8000' +
                    str(settings.MEDIA_URL) + 'report_images/' +
                    'comparisionFolRec_' + code + '.png',
                    'http://localhost:8000' +
                    str(settings.MEDIA_URL) + 'report_images/' +
                    'retweetToPolarity_' + code + '.png',
                    'http://localhost:8000' +
                    str(settings.MEDIA_URL) + 'report_images/' +
                    'performancePercentages_' + code + '.png',
                    'http://localhost:8000' +
                    str(settings.MEDIA_URL) + 'report_images/' +
                    'ScatterPlot_' + code + '.png',
                    'http://localhost:8000' +
                    str(settings.MEDIA_URL) + 'report_images/' +
                    'PolarityDistAccLang_' + code + '.png',
                    'http://localhost:8000' +
                    str(settings.MEDIA_URL) + 'report_images/' +
                    'Top20Words_' + code + '.png',
                    'http://localhost:8000' +
                    str(settings.MEDIA_URL) + 'report_images/' +
                    'WordGraph_' + code + '.png',

                ]
                data = {
                    'data': serializer.data,
                    'sentiment': sentiment,
                    'sarcasam': sarcasam,
                    'images': images,
                    'summaryData': summaryData,
                }
                print(data)
                return Response(data, status=status.HTTP_201_CREATED)

            else:
                print('why')
                return Response('The coordinates column in the dataset is Empty.',
                                status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response('The dataset is Empty.',
                            status=status.HTTP_400_BAD_REQUEST)

    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def fb_predict_client(request):
    parser_classes = [MultiPartParser, FormParser, ]
    data = request.data
    print(data)
    print(request.FILES)
    csv_file = data['File']
    csv_file_name = data['fileName']
    print(csv_file)
    filename = {}

    serializer = FbModelClientSerializer(data=data)
    a = request.user.user_id
    if serializer.is_valid():
        code = code_generate(10)
        print(code)
        # code_check = FileUpload.objects.filter(code=code).order_by('-email')
        # print(code_check)
        # for i in range(len(code_check)):

        #     if code_check[i]['code'] == code:
        #         code =code_generate(10)
        serializer.validated_data['code'] = code

        sskFBPredictor(csv_file, csv_file_name, code)
        filename[a] = [{0: os.path.join(str(settings.MEDIA_ROOT) + '/predict_files/facebook',
                                        csv_file_name.split('.')[0] + '_' + code + '_PosPosts.csv')},
                       {1: os.path.join(str(settings.MEDIA_ROOT) + '/predict_files/facebook',
                                        csv_file_name.split('.')[0] + '_' + code + '_NegPosts.csv')}]
        print(filename)
        fileName = filename[a]
        sentiment, sarcasam = download(fileName[0][0], fileName[1][1])
        print(fileName)
        data = {
            'data': serializer.validated_data,
            'sentiment': sentiment,
            'sarcasam': sarcasam,
        }
        print('is valid')
        serializer.save()
        return Response(data, status=status.HTTP_201_CREATED)
        # filename.append({filename[a] : {0 : csv_file_name.split('.')[0] + '_Sentiments' + code +  '.csv'},
        # {1:csv_file_name.split('.')[0] + '_Sentiments' + code +  '.csv'}})

    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def download(file1, file2):
    # path_to_file_sent = os.path.join(str(
    #     settings.MEDIA_ROOT) + '/predict_files', file1)
    # path_to_file_sar = os.path.join(str(
    #     settings.MEDIA_ROOT) + '/predict_files', file2)

    # with open(path_to_file_sent, 'r', encoding='utf-8') as fh:
    #             print(fh.read())
    #             sentiment = fh.read()
    f0 = open(file1, 'r', encoding='utf-8')
    sentiment = f0.read()
    # response = HttpResponse(
    #     fh.read(), content_type="application/force-download")
    # response['Content-Disposition'] = 'inline; filename=' + fileName[0][0]
    # sentiment = response['Content-Disposition']
    # return sentiment

    f1 = open(file2, 'r', encoding='utf-8')
    sarcasam = f1.read()
    # response = HttpResponse(
    #     fh.read(), content_type="application/force-download")
    # response['Content-Disposition'] = 'inline; filename=' + fileName[1][1]
    # sarcasam = response['Content-Disposition']
    # return sarcasam

    data = {
        'sentiment': sentiment,
        'sarcasam': sarcasam,
    }

    print(data)
    return sentiment, sarcasam
