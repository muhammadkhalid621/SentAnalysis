# # from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .serializers import userProfileSerializer
from .models import UserAccount

# # from django.contrib.auth.models import User
# # from django.contrib.auth.hashers import make_password
# # from rest_framework import status
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = userProfileSerializer(user, many=False)
    print(serializer.data)
    # print(.FILES.get('image'))
    return Response(serializer.data)
# # # Create your views here.
# # @api_view(['PUT'])
# # @permission_classes([IsAuthenticated])
# # def updateUserProfile(request):
# #     try:
# #         user = self.request.user
# #         email = user.email

# #         data = self.request.data
#         # username = data['username']
#         # number = data['number']
#         # plan = data['plan']
#         # gender = data['gender']
#         # dob = data['dob']
#         # if data['password'] != '':
#         #     password = make_password(data['password'])
        

#         # UserAccount.objects.filter(user=user).update(
#         #     email=email, 
#         #     username=username,
#         #     number=number, 
#         #     password=password, 
#         #     plan=plan, 
#         #     gender=gender , 
#         #     dob=dob)

# #         user_profile = UserAccount.objects.get(user=user)
# #         user_profile = UserCreateSerializer(user_profile)

# #         return Response({ 'profile': user_profile.data, 'email': str(email) })
# #     except:
# #         return Response({ 'error': 'Something went wrong when updating profile' })


# # @api_view(['GET'])
# # # @permission_classes([IsAuthenticated])
# # def getUserProfile(request):
# #     try:
# #         user = self.request.user
# #         email = user.email
# #         print(user.data)
# #         print('hello')
# #         user_profile = UserAccount.objects.get(user=user)
# #         user_profile = UserAccount(user_profile)

# #         return Response({ 'profile': user_profile.data, 'email': str(email) })
# #     except:
# #         return Response({ 'error': 'Something went wrong when retrieving profile' })

# # # @api_view(['GET'])
# # # @permission_classes([IsAdminUser])
# # # def getUsers(request):
# # #     users = User.objects.all()
# # #     serializer = UserSerializer(users, many=True)
# # #     return Response(serializer.data)


# # # @api_view(['GET'])
# # # @permission_classes([IsAdminUser])
# # # def getUserById(request, pk):
# # #     user = User.objects.get(id=pk)
# # #     serializer = UserSerializer(user, many=False)
# # #     return Response(serializer.data)


# # # @api_view(['PUT'])
# # # @permission_classes([IsAuthenticated])
# # # def updateUser(request, pk):
# # #     try:
# # #         user = self.request.user
# # #         username = user.username

# # #         data = self.request.data
# # #         first_name = data['first_name']
# # #         last_name = data['last_name']
# # #         phone = data['phone']
# # #         city = data['city']

# # #         UserProfile.objects.filter(user=user).update(first_name=first_name, last_name=last_name, phone=phone, city=city)

# # #         user_profile = UserProfile.objects.get(user=user)
# # #         user_profile = UserProfileSerializer(user_profile)

# # #         return Response({ 'profile': user_profile.data, 'username': str(username) })
# # #     except:
# # #         return Response({ 'error': 'Something went wrong when updating profile' })


# # @api_view(['DELETE'])
# # @permission_classes([IsAdminUser])
# # def deleteUser(request, pk):
# #     try:
# #         userForDeletion = User.objects.get(id=pk)
# #         userForDeletion.delete()
# #         return Response('User was deleted')

# #     except:
# #         return Response({ 'error': 'Something went wrong when deleting profile' })

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from django.contrib.auth.hashers import make_password
# from .models import UserAccount
# from .serializers import UserCreateSerializer

# class GetUserProfileView(APIView):
#     def get(self, request, format=None):
#         try:
#             user = self.request.user
#             username = user.username

#             user_profile = UserAccount.objects.get(user=user)
#             user_profile = UserCreateSerializer(user_profile)

#             return Response({ 'profile': user_profile.data, 'username': str(username) })
#         except:
#             return Response({ 'error': 'Something went wrong when retrieving profile' })

# class UpdateUserProfileView(APIView):
#     def put(self, request, format=None):
#         try:
#             user = self.request.user
#             username = user.username

#             data = self.request.data
#             username = data['username']
#             email = data['email']
#             number = data['number']
#             plan = data['plan']
#             gender = data['gender']
#             dob = data['dob']
#             if data['password'] != '':
#                 password = make_password(data['password'])

#             UserAccount.objects.filter(user=user).update(
#             email=email, 
#             username=username,
#             number=number, 
#             password=password, 
#             plan=plan, 
#             gender=gender , 
#             dob=dob)
#             user_profile = UserAccount.objects.get(user=user)
#             user_profile = UserCreateSerializer(user_profile)

#             return Response({ 'profile': user_profile.data, 'username': str(username) })
#         except:
#             return Response({ 'error': 'Something went wrong when updating profile' })

# from rest_framework.generics import (ListCreateAPIView,RetrieveUpdateDestroyAPIView,)
# from rest_framework.permissions import IsAuthenticated
# from .models import userProfile, UserAccount
# from .permissions import IsOwnerProfileOrReadOnly
# from .serializers import userProfileSerializer, UserCreateSerializer
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.parsers import MultiPartParser, FormParser

# Create your views here.
# @api_view(['POST'])
# def UserAccountView(request):
#     parser_classes = [MultiPartParser, FormParser,]
#     print('data',request.data)
#     print('files',request.FILES)
#     data = request.data
#     serializer = UserCreateSerializer(data=data)

#     if serializer.is_valid():
#         serializer.save()
#         return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
    
#     else:
#         print('error', posts_serializer.errors)
#         return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class UserProfileListCreateView(ListCreateAPIView):
#     queryset=userProfile.objects.all()
#     serializer_class=userProfileSerializer
#     permission_classes=[IsAuthenticated]

#     def perform_create(self, serializer):
#         user=self.request.user
#         serializer.save(user=user)


# class userProfileDetailView(RetrieveUpdateDestroyAPIView):
#     queryset=userProfile.objects.all()
#     serializer_class=userProfileSerializer
#     permission_classes=[IsOwnerProfileOrReadOnly,IsAuthenticated]