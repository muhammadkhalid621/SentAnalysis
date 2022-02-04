# from django.shortcuts import render
# from .models import SearchWord
# from rest_framework import viewsets
from rest_framework import status
from .serializers import SearchWordSerializer
from .tweeter_scrapper import tweeter_scrapper
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# Create your views here.


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def TwitterScrapperView(request):
    print('data1',request.data)
    # serializer = SearchWordSerializer(data=request.data['query'],many=True)
    data = request.data
    print(data['search_word']+'.csv')
    tweeter_scrapper(data['search_word'])
    
    serializer = SearchWordSerializer(data=data)
    print(serializer.is_valid())
    if serializer.is_valid():
        serializer.save()
    print(serializer.errors)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
    
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

# class TwitterScrapperView():
#     queryset = SearchWord.objects.all()
#     serializer_class = SearchWordSerializer

#     def create(self, request, * args, ** kwargs):
#         serializer = self.get_serializer(data = request.data)
#         serializer.is_valid(raise_exception = True)

#         # Here all incoming data we kept in serializer variable.
#         # Change the data in your way and then pass it inside perform_create()

#         self.perform_create(serializer)
#         headers = self.get_success_headers(serializer.data)
#         return Response(
#         data = {
#             "status": 201,
#             "message": "Product Successfully Created",
#             "data": serializer.data,
#         },
#         status = status.HTTP_201_CREATED,
#         headers = headers
#         )
