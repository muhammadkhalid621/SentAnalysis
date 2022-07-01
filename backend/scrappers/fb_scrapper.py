import csv
import time
from asyncio import sleep
from pprint import pprint
from facebook_scraper import *
import pandas as pd
from facebook_scraper import get_posts, get_profile, set_cookies
from tqdm import tqdm
from datetime import datetime
from json import dumps
import os
from datetime import datetime
from django.conf import settings
now = datetime.now()
time = now.strftime("%H:%M:%S")

fb_id = 'sskenterprises486@gmail.com'
fb_pass = 'unimaginable_TRUE_4_'


def scrape_pages(page_name, no_of_pages, code):
    results = []
    for page in get_posts(page_name, pages=no_of_pages, credentials=(fb_id, fb_pass)):
        results.append(page)
    print(results)
    dataset = pd.DataFrame.from_records(results)
    dataset.to_csv(os.path.join(str(settings.MEDIA_ROOT) + '/scrappers/facebook', 
                       page_name + '_' + code + '_page.csv'), index=False)


def scrape_post(post_url, code):
    results = []
    for post in list(get_posts(post_urls=[post_url],
                               credentials=(fb_id, fb_pass), options={"comments": "generator", "reactions": True,
                               "reactors": True, "allow_extra_requests": True})):
        results.append(post)
    print(results)
    dataset = pd.DataFrame.from_records(results)
    dataset.to_csv(os.path.join(str(settings.MEDIA_ROOT) + '/scrappers/facebook', 
                       post_url.split('/')[-2] + '_' + code + '_post.csv'), index=False)


def scrape_comments(post_url, code):
    csvFile = open(os.path.join(str(settings.MEDIA_ROOT) + '/scrappers/facebook', 
                   post_url.split('/')[-2] + '_' + code + '_comments.csv'), 'w', encoding="utf-8")
    csvWriter = csv.writer(csvFile)
    csvWriter.writerow(['comment_id', 'comment_image',
                        'comment_reaction_count',
                        'comment_reactions',
                        'comment_reactors',
                        'comment_text',
                        'comment_time',
                        'comment_url',
                        'commenter_id',
                        'commenter_meta',
                        'commenter_name',
                        'commenter_url',
                        'replies'])

    post = next(
        get_posts(
            post_urls=[post_url],
            credentials=(fb_id, fb_pass),
            options={"comments": "generator", "reactions": True, },
        )
    )
    comments = list(post["comments_full"])
    print(f"Got {len(comments)} comments. Fetching replies...")
    for comment in tqdm(comments):
        comment["replies"] = list(comment["replies"])
        pprint(comment)
        csvWriter.writerow(
            [comment['comment_id'], comment['comment_image'], comment['comment_reaction_count'], comment['comment_reactions'], comment['comment_reactors'], comment['comment_text'], comment['comment_time'], comment['comment_url'], comment['commenter_id'], comment['commenter_meta'],
             comment['commenter_name']
             ])
        if comment["replies"]:

            csvWriter.writerow([comment['comment_id'], comment['comment_image'], comment['comment_reaction_count'], comment['comment_reactions'], comment['comment_reactors'], comment['comment_text'], comment['comment_time'], comment['comment_url'], comment['commenter_id'], comment['commenter_meta'],
                                comment['commenter_name']
                                ])

    #         csvWriter.writerow("replies")
            print(f"Found {len(comment['replies'])} replies, sleeping 20s")


def scrape_group(group_id, no_of_pages, code):
    result = []
    for l in list(get_posts(group=group_id, pages=no_of_pages, options={"allow_extra_requests": True})):
        results.append(l)
#     print(post)
    dataset = pd.DataFrame.from_records(results)
    dataset.to_csv(os.path.join(str(settings.MEDIA_ROOT) + '/scrappers/facebook', 
                   group_id + '_' + code + '_group.csv'), index-False)
