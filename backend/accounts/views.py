# # from django.shortcuts import render
import pandas as pd
import json
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .serializers import UserCreateSerializer, taskSerializer
from .models import UserAccount, Task
from django.contrib.auth import get_user_model
import os
from django.conf import settings
from django.http import HttpResponse
from .mail import send_email
User = get_user_model()
from django.contrib.auth.hashers import check_password
# # from django.contrib.auth.models import User
# # from django.contrib.auth.hashers import make_password
# # from rest_framework import status


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getUserProfile(request):
#     user = request.user
#     serializer = userProfileSerializer(user, many=False)
#     print(serializer.data)
#     # print(.FILES.get('image'))
#     return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getClients(request):
    clients_suspended = User.objects.filter(is_staff=False, suspend='TRUE').order_by('-email')
    clients_unsuspended = User.objects.filter(is_staff=False, suspend='FALSE').order_by('-email')
    active = len(User.objects.filter(is_staff=False, is_active=True))
    non_active = len(User.objects.filter(is_staff=False, suspend='FALSE'))
    premium = len(User.objects.filter(is_staff=False,
                  is_active=True, plan='Enterprise'))
    serializer_suspended = UserCreateSerializer(clients_suspended, many=True)
    serializer_unsuspended = UserCreateSerializer(clients_unsuspended, many=True)
    # users = [serializer.data, active, non_active]
    users = {
        'clients_suspended': serializer_suspended.data,
        'clients_unsuspend': serializer_unsuspended.data,
        'active': active,
        'non-active': len(clients_unsuspended),
        'plan': premium,
    }

    data = json.dumps(users, indent=4, sort_keys=True)
    print('hello', users)
    return Response(users, content_type='multipart/form-data')


@api_view(['GET'])
@permission_classes([IsAdminUser])
def downloadClients(request):
    clients = User.objects.filter(is_staff=False).order_by('-email')
    users = UserCreateSerializer(clients, many=True)
    # users = [serializer.data, active, non_active]
    print(list(users.data))
    path_to_file = os.path.join(str(
        settings.MEDIA_ROOT), "clients.csv")
    pd.DataFrame(users.data).to_csv(path_to_file)

    if os.path.exists(path_to_file):
        with open(path_to_file, 'r', encoding='utf-8') as fh:
            response = HttpResponse(
                fh.read(), content_type="application/force-download")
            response['Content-Disposition'] = 'inline; filename=clients.csv'

            return response
    # return Response(users.data, content_type='multipart/form-data')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def taskUpload(request):
    data = request.data
    print(data)
    task = taskSerializer(data=data)
    if task.is_valid():
        print('is valid')
        task.save()
    else:
        print(task.errors)
    return Response(task.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getEmails(request):
    admins = User.objects.filter(is_staff=True).order_by('-email')
    serializer = UserCreateSerializer(admins, many=True)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getTask(request):
    email = request.user.email
    print(email)
    task = Task.objects.filter(
        assignTo=email, taskStatus='FALSE').order_by('-assignFrom')
    serializer = taskSerializer(task, many=True)
    print(serializer.data)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateTask(request, pk):
    data = request.data['task_id']
    print(data)
    task = Task.objects.get(task_id=data)
    task.taskStatus = 'TRUE'

    task.save()
    serializer = taskSerializer(task, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def Suspend(request, pk):
    data = request.data
    print(data)
    user = UserAccount.objects.get(user_id=data['user_id'])
    user.suspend = 'TRUE'
    print(user)
    user.save()
    serializer = UserCreateSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def send_mail(request):
    data = request.data
    print(data)
    send_email(data['client_email'], data['subject'], data['body'])
    return Response(data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getTaskDetails(request):
    email = request.user.email
    print('heelo',email)
    task = Task.objects.filter(
        assignTo=email, taskStatus=True).order_by('-assignFrom')
    serializer = taskSerializer(task, many=True)
    print(serializer.data)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def change_pass(request):
    data = request.data
    u = UserAccount.objects.get(email=request.user)
    print(u)
    print(request.user.password)
    check  = check_password(data['old_password'], request.user.password)
    print(check)
    if check:
        u.set_password(data['new_password'])
        print(u.password)
        u.save()
        return Response(data, status=status.HTTP_201_CREATED)
    else:
        return Response('Password is Incorrect',
                            status=status.HTTP_400_BAD_REQUEST)



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
