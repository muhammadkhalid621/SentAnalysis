from rest_framework import status
from .serializers import FileUploadSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .SSKModelGeneraterModule import modelTrainers
from .PredictionModuleAdminClient import sskPredictor
from .ReportAnalysis import generateReport
from .locationModule import mapCreator
import csv
import json
import pandas as pd
import os
# Create your views here.

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ModelRunView(request):
    parser_classes = [MultiPartParser, FormParser,]
    data = request.data
    print(data)
    serializer = FileUploadSerializer(data=data)
    print(request.FILES)
    csv_file = data['File']
    csv_file_name = data['fileName']
    print(csv_file)
    print('file',os.path.splitext(os.path.split(csv_file_name)[1])[0])
    print(serializer.is_valid())
    
    if data['option'] == 'Train':
        modelTrainers(csv_file)

    if data['option'] == 'Prediction':
        sskPredictor(csv_file, csv_file_name)
        # mapCreator(csv_file_name.split('.')[0]+'_Sentiments.csv',csv_file_name)
        generateReport(csv_file_name.split('.')[0]+'_Sentiments.csv', data['username'], csv_file_name.split('.')[0], data['email'])
    
    if serializer.is_valid():
        
        print('is valid')
        serializer.save()
    else:
        print(serializer.errors)
    return Response(serializer.data, status=status.HTTP_201_CREATED)