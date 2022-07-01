# from .mailing import send_mail
from django.conf import settings
import os
from datetime import datetime


def libs():
    import pandas as pd
    import seaborn as sns
    pd.options.mode.chained_assignment = None
    import numpy as np
    from fpdf import FPDF

    # for wordcloud
    import re
    import string
    from nltk.tokenize import word_tokenize
    from nltk.corpus import stopwords
    from nltk.stem import PorterStemmer
    from nltk.tokenize import TweetTokenizer
    import nltk
    # import pandas as pd
    # import matplotlib.pyplot as plt
    from wordcloud import WordCloud
    nltk.download('stopwords')
    from os import getcwd
    import matplotlib.pyplot as plt
    import matplotlib
    matplotlib.use('Agg')

    return pd, plt, sns, FPDF, np, re, string, word_tokenize, stopwords, PorterStemmer, TweetTokenizer, nltk, WordCloud


def dataExtractor(data, pd):
    #top 10 followed acc separated###############################################

    engagementData = data.sort_values('user_followers', ascending=False)
    engagementData = engagementData.head(10)

    #extraction of retweets######################################################

    totalNegativeRetweets = 0
    totalPositiveRetweets = 0
    totalNeutralRetweets = 0
    for i in data.index:
        if data.loc[i, "Sentiment"] == 0:
            totalNegativeRetweets = totalNegativeRetweets + \
                data.loc[i, 'retweet-count']
        elif data.loc[i, "Sentiment"] == 1:
            totalPositiveRetweets = totalPositiveRetweets + \
                data.loc[i, 'retweet-count']
        else:
            totalNeutralRetweets = totalNeutralRetweets + \
                data.loc[i, 'retweet-count']

    reachlabels = ['Negative', 'Positive', 'Neutral']
    reachData = [totalNegativeRetweets,
                 totalPositiveRetweets, totalNeutralRetweets]
    totalReach = str(totalNegativeRetweets +
                     totalPositiveRetweets+totalNeutralRetweets)

    print('dataExtractor successful')

    return engagementData, reachData, reachlabels, totalReach


def sentimentPercentage(data, pd, plt, sns, code):
    Sentiments = data['Sentiment'].value_counts()
    # print(Sentiments)
    labels = ["Negative", "Positive", "Nuteral"]
    plots = sns.barplot(x=Sentiments.keys(), y=Sentiments.values, palette=[
                        'red', 'green', 'blue'])

    for bar in plots.patches:
        val = str(round((bar.get_height()/data.shape[0]*100), 2)) + " %"
        plots.annotate(format(val),
                       (bar.get_x() + bar.get_width() / 2,
                       bar.get_height()), ha='center', va='center',
                       size=12, xytext=(0, 5),
                       textcoords='offset points')
    plt.title("Performance Percentages", fontsize=20)  # for title
    plt.xlabel("Sentiments", fontsize=15)  # label for x-axis
    plt.ylabel("Number of tweets", fontsize=15)  # label for y-axis
    plt.savefig(os.path.join(str(settings.MEDIA_ROOT) +
                '/report_images', 'performancePercentages_' + code + '.png'))
    plt.clf()
    print('sentiment percentage successful')


def polarityDist(data, pd, plt, sns, code):
    sns.lineplot(x='retweet-count', y='Polarity', data=data, hue='Sentiment',
                 style="Sentiment",
                 palette=['r', 'g'], dashes=False, markers=["X", "."],
                 linewidth=1.5)

    plt.title("Retweet count to polarity ratio", fontsize=20)  # for title
    plt.xlabel("Retweets", fontsize=15)  # label for x-axis
    plt.ylabel("Polarity", fontsize=15)  # label for y-axis
    plt.savefig(os.path.join(str(settings.MEDIA_ROOT) +
                '/report_images', 'retweetToPolarity_' + code + '.png'))
    plt.clf()
    print('POLARITY DIST successful')


def pieChart(data, pd, plt, sns, reachData, reachlabels, code):
    colors = [sns.color_palette('pastel')[1], sns.color_palette('pastel')[
        2], sns.color_palette('pastel')[0]]
    plt.figure(figsize=(15, 8))
    plt.pie(reachData, labels=reachlabels, colors=colors, autopct='%.0f%%')
    plt.savefig(os.path.join(str(settings.MEDIA_ROOT) +
                '/report_images', 'pieChartReach_' + code + '.png'))
    plt.clf()
    print('pie chart successful')


def comparsionGraph(data, pd, plt, sns, engagementData, reachData, reachlabels, code):
    max_value = engagementData['user_followers']. max()
    fig = plt.figure()
    ax1 = fig.add_subplot(111)
    ax2 = ax1.twinx()
    ax1.set_xlabel('User Name')
    ax1.set_ylabel('followers')
    ax2.set_ylabel('retweets')
    # sns.set(font_scale = 1)
    width = 0.4
    # clrs = ['brown' if (x < 0) else 'green' for x in engagementData['sentiments'] ]
    clrs = [sns.color_palette("pastel")[1] if (x < 0) else sns.color_palette(
        "pastel")[2] for x in engagementData['Sentiment']]
    Color = sns.color_palette("pastel")[8]
    df1 = engagementData.set_index('user_name')
    df2 = engagementData.set_index('user_name')
    # to scale both the y axis to a singular max value
    ax2.set_ylim(0, max_value)
    df1['user_followers'].plot(
        kind='bar', color=clrs, ax=ax1, width=width, position=1)
    df2['retweet-count'].plot(kind='bar', color=Color,
                              ax=ax2, width=width, position=0)
    plt.savefig(os.path.join(str(settings.MEDIA_ROOT) +
                '/report_images', 'comparisionFolRec_' + code + '.png'))
    plt.clf()
    print('comparison graph successful')


def scatterPlot(data, pd, plt, sns, code):
    sns_plot = sns.scatterplot(
        data['Polarity'], data['lang'], hue=data["Sentiment"])
    plt.figure(figsize=(15, 8))
    sns_plot.figure.savefig(os.path.join(
        str(settings.MEDIA_ROOT) + '/report_images', 'ScatterPlot_' + code + '.png'))


def streamChart(data, pd, sns, plt, np, code):

    df = data
    sns.set_theme(style="white", rc={"axes.facecolor": (0, 0, 0, 0)})
    my_list = df['lang'].unique()
    lang_dict = dict()
    for index, value in enumerate(my_list):
        lang_dict[index] = value

    df = df[['user_id', 'lang', 'Sentiment', 'Polarity']]
    df["Polarity"] = 10 * df["Polarity"]
    lang_mean_serie = df.groupby('lang')['Polarity'].mean()
    lang_mean_serie
    df['mean_Polarity'] = df['lang'].map(lang_mean_serie)
    # df.head(15)

    pal = sns.color_palette(palette='coolwarm', n_colors=12)
    g = sns.FacetGrid(df, row='lang', hue='mean_Polarity',
                      aspect=15, height=0.75, palette=pal)

    # # then we add the densities kdeplots for each month
    g.map(sns.kdeplot, 'Polarity', bw_adjust=1,
          clip_on=False, fill=True, alpha=1, linewidth=1.5)

    # # here we add a white line that represents the contour of each kdeplot
    g.map(sns.kdeplot, 'Polarity', bw_adjust=1, clip_on=False, color="w", lw=2)

    # # here we add a horizontal line for each plot
    g.map(plt.axhline, y=0, lw=2, clip_on=False)

    # # we loop over the FacetGrid figure axes (g.axes.flat) and add the month as text with the right color
    # # notice how ax.lines[-1].get_color() enables you to access the last line's color in each matplotlib.Axes
    for i, ax in enumerate(g.axes.flat):
        ax.text(-15, 0.02, lang_dict[i], fontweight='bold',
                fontsize=10, color=ax.lines[-1].get_color())

    # # we use matplotlib.Figure.subplots_adjust() function to get the subplots to overlap
    g.fig.subplots_adjust(hspace=1)

    # # eventually we remove axes titles, yticks and spines
    g.set_titles("")
    g.set(yticks=[])
    g.despine(bottom=True, left=True)

    plt.setp(ax.get_xticklabels(), fontsize=15, fontweight='bold')
    plt.xlabel('Polarity scaled up by a factr of 10 for better visualization',
               fontweight='bold', fontsize=15)
    plt.savefig(os.path.join(str(settings.MEDIA_ROOT) +
                '/report_images', 'PolarityDistAccLang_' + code + '.png'))
    plt.clf()


def process_tweet(tweet, re, string, word_tokenize, stopwords, PorterStemmer, TweetTokenizer, nltk):
    stemmer = PorterStemmer()
    stopwords_english = stopwords.words('english')
    tweet = re.sub(r'\$\w*', '', tweet)
    tweet = re.sub(r'^RT[\s]+', '', tweet)
    tweet = re.sub(r'https?:\/\/.*[\r\n]*', '', tweet)
    tweet = re.sub(r'http.?://[^\s]+[\s]?', '', tweet)
    tweet = re.sub(r'[^A-Za-z0-9]+', ' ', tweet)
    tweet = re.sub(r'@', '', tweet)
    tweet = re.sub(r'#', '', tweet)
    tokenizer = TweetTokenizer(
        preserve_case=False, strip_handles=True, reduce_len=True)
    tweet_tokens = tokenizer.tokenize(tweet)

    tweets_clean = []
    for word in tweet_tokens:
        if (word not in stopwords_english and  # remove stopwords
                word not in string.punctuation):  # remove punctuation
            tweets_clean.append(word)  # use the above code if you want to stem

    filtered_sentence = (" ").join(tweets_clean)
    return(filtered_sentence)


def wordCloud(data, re, string, word_tokenize, stopwords, PorterStemmer, TweetTokenizer, nltk, pd, plt, WordCloud, code):
    data1 = data
    data1['text'].dropna(inplace=True)
    # data1.head(3)
    data1['text'] = data1['text'].apply(lambda x: process_tweet(
        x, re, string, word_tokenize, stopwords, PorterStemmer, TweetTokenizer, nltk))
    texts = " ".join(text for text in data1.text)
    # print('this statemene is for the wordcloud text checking\n'+texts)
    word_cloud = WordCloud(
        collocations=False, background_color='white').generate(texts)
    word_cloud = word_cloud.to_file(os.path.join(
        str(settings.MEDIA_ROOT) + '/report_images', 'WordGraph_' + code + '.png'))


def get_label_rotation(angle, offset, np):

    rotation = np.rad2deg(angle + offset)
    if angle <= np.pi:
        alignment = "right"
        rotation = rotation + 180
    else:
        alignment = "left"
    return rotation, alignment


def add_labels(angles, values, labels, offset, ax, np):

    # This is the space between the end of the bar and the label
    padding = 10

    # Iterate over angles, values, and labels, to add all of them.
    for angle, value, label, in zip(angles, values, labels):
        angle = angle

        # Obtain text rotation and alignment
        rotation, alignment = get_label_rotation(angle, offset, np)

        # And finally add the text
        ax.text(
            x=angle,
            # y=value + padding,
            y=padding,
            s=label,
            ha=alignment,
            va="center",
            rotation=rotation,
            rotation_mode="anchor"
        )


def circularBar(data, pd, plt, sns, np, re, string, word_tokenize, stopwords, PorterStemmer, TweetTokenizer, nltk, code):
    from collections import Counter
    df = data
    df['text'] = df['text'].apply(lambda x: process_tweet(
        x, re, string, word_tokenize, stopwords, PorterStemmer, TweetTokenizer, nltk))
    top20 = Counter(" ".join(df["text"]).split()).most_common(20)
    top20 = pd.DataFrame.from_dict(
        dict(top20), orient='index', columns=['Count'])

    ANGLES = np.linspace(0, 2 * np.pi, len(top20), endpoint=False)
    VALUES = top20["Count"].values
    LABELS = top20.index.values

    WIDTH = 2 * np.pi / len(VALUES)
    OFFSET = np.pi / 2

    fig, ax = plt.subplots(figsize=(15, 8), subplot_kw={"projection": "polar"})
    ax.set_theta_offset(OFFSET)
    ax.set_ylim(-100, 100)

    ax.set_frame_on(False)

    ax.xaxis.grid(False)
    ax.yaxis.grid(False)
    ax.set_xticks([])
    ax.set_yticks([])

    ax.bar(ANGLES, VALUES, width=WIDTH, linewidth=2,
           color="#61a4b2", edgecolor="white")
    add_labels(ANGLES, VALUES, LABELS, OFFSET, ax, np)
    fig.savefig(os.path.join(str(settings.MEDIA_ROOT) + '/report_images',
                'Top20Words_' + code + '.png'), bbox_inches='tight')


def Summary(data, pd, reachData):
    Sentiments = data['Sentiment'].value_counts()

    totalTweets = data.shape[0]
    negativeTweets = Sentiments[0]
    # neutralTweets = Sentiments[0]
    positiveTweets = Sentiments[1]
    highestNegative = data[data.Polarity ==
                           data.Polarity.min()].Polarity.values[0]
    highestPositive = data[data.Polarity ==
                           data.Polarity.max()].Polarity.values[0]
    # print(totalTweets,negativeTweets,neutralTweets,positiveTweets,'\n',highestPositive['polarity'],'\n',highestNegative)
    summaryData = [['Total Tweets', 'Negative Tweets'],
                   [totalTweets, negativeTweets],
                   ['Positive Tweets', 'Highest Negative', 'Highest Positive'],
                   [positiveTweets, highestNegative, highestPositive]]

    retweetSummaryData = [["Total Negative Retweets", "Total Positive Retweets", "Total Neutral Retweets"],
                          [reachData[0], reachData[1], reachData[2]]]

    a = data[data.Polarity == data.Polarity.min(
    )][['user_name', 'Polarity', 'user_followers', 'retweet-count']]
    b = data[data.Polarity == data.Polarity.max(
    )][['user_name', 'Polarity', 'user_followers', 'retweet-count']]
    infoNeg = ['Negative', a['user_name'].values[0], a['Polarity'].values[0],
               a['user_followers'].values[0], a['retweet-count'].values[0]]
    infoPos = ['Positive', b['user_name'].values[0], b['Polarity'].values[0],
               b['user_followers'].values[0], b['retweet-count'].values[0]]
    infoHighest = [['', 'User name', 'Polarity', 'Followers', "Retweet count"],
                   infoNeg, infoPos]

    return summaryData, retweetSummaryData, infoHighest
    print('summary successful')


def appendixTable():

    infoTable1 = [['Graph',	'Analysis',	'Page No'],
                  ['Bar Graph',	'Total Sentiment Distribution',	'02'],
                  ['Line Graph',	'Polarity to Reach distribution',	'03'],
                  ['Histogram',	'Followers to retweet ratio',	'04'],
                  ['Scatter Plot',	'Language to polarity analysis',	'05'],
                  ['Stream Lines',	'Average polarity distribution',	'05'],
                  ['Chart',	'20 most used words',	'06'],
                  ['Word Cloud',	'Visual Summary of trend',	'06'],
                  ['Pie Chart',	'Sentiment Agreeability', 	'07']]

    infoTable2 = [
        ['Question'],
        ['Q1 What is the total sentiment count of the given trend?'],
        ['Q2 How many people share the same kind of intense emotion regarding the trend?'],
        ['Q3 How many followers have actually shared the tweet?'],
        ['Q4 What is the polarity distribution of the trend by the language that the tweet is posted in?'],
        ['Q5 Mean polarity distribution of the sentiments of trend in question based on the language?'],
        ['Q6 What are the 20 most frequently used word to describe the trend?'],
        ['Q7 Visual summary of all the words that are used for the trend and how much are they being used for the trend?'],
        ['Q8 How many people have partake in the trend by either posting the tweet or retweeting it?']]

    infoTable3 = [
        ['Question', 'Graph', 'Pg No'],
        ['Q1', 'Bar Graph', '02'],
        ['Q2', 'Line Graph', '03'],
        ['Q3', 'Histogram', '04'],
        ['Q4', 'Scatter Plot', '05'],
        ['Q5', 'Stream Lines', '05'],
        ['Q6', 'Circular Bar Chart', '06'],
        ['Q7', 'Word Cloud', '06'],
        ['Q8', 'Pie Chart', '07']]

    return infoTable1, infoTable2, infoTable3


def conclusion(data, pd):
    Sentiments = data['Sentiment'].value_counts()

    if Sentiments.idxmax() == -1:
        conclusionSents = 'Negatively'
    elif Sentiments.idxmax() == 1:
        conclusionSents = 'Positively'
    else:
        conclusionSents = 'Neutrally'

    return conclusionSents
    print('conclusion successful')


def myReport(FPDF, infoTable1, infoTable2, infoTable3, summaryData, retweetSummaryData, infoHighest, conclusionSents, totalReach, clientName, clientTopic, clienrEmail, code):

    class PDF(FPDF):
        def footer(self):
           # Go to 1.5 cm from bottom
            self.set_y(-15)
            # Select Arial italic 8
            self.set_font('Arial', 'I', 8)
            # Print centered page number
            self.cell(0, 10, 'Page %s' % self.page_no(), 0, 0, 'C')

    def simple_table(Spacing, Data, fontSize, cols):
        spacing = Spacing
        data = Data
        pdf.set_line_width(0.5)
        pdf.set_font('Arial', '', fontSize)

        col_width = 180 / cols
        row_height = pdf.font_size
        for row in data:
            for item in row:
                print(item)
                pdf.cell(col_width, row_height*spacing,
                         txt=str(item), border=1, align='C')
            pdf.ln(row_height*spacing)

        pdf.set_font('Arial', '', 12)

    def pageLayout():
        pdf.add_page()
        pdf.set_line_width(0.2)
        pdf.rect(5, 5, 200, 287, 'D')

    def heading1(text):
        pdf.set_font('Arial', 'U', size=20)
        pdf.multi_cell(190, 10, text, 0, 'L')
        pdf.cell(190, 5, '', 0, 1,)
        pdf.set_font('Arial', '', 12)

    def pageNumber():
        pdf.set_font('Arial', 'I', size=8)
        pdf.text(190, 290, 'Pg '+str(pdf.page_no()-1))
        pdf.set_font('Arial', '', size=12)

    # title page

    pdf = FPDF()
    pageLayout()
    pdf.image(os.path.join(str(settings.MEDIA_ROOT),
              'ssk.jpg'), x=40, y=100, w=55, h=50)
    pdf.add_font("Arial", "", './media/files/fonts/arial.ttf', uni=True)
    pdf.set_font('Arial', '', 18)
    pdf.text(110, 160, 'ABSTRACT')
    pdf.text(40, 160, 'DATA ANALYTICS')
    pdf.text(40, 170, 'REPORT')
    absText = ['The following report contains the analytics',
               'performed on the given data set by the customer.',
               'The report not only contains textual information',
               'but also graphical representation of the insights to',
               'help the individual understand the performance.']
    pdf.set_line_width(1)
    pdf.line(100, 70, 100, 200)
    pdf.set_font('Times', '', 12)
    for i in range(len(absText)):
        pdf.text(110, 170 + i*5, absText[i])

    # page1
    pageLayout()
    pageNumber()
    pdf.set_font('Arial', 'U', 24)
    heading1('APPENDIX:')
    pdf.cell(190, 15, '', 0, 1,)
    simple_table(2, infoTable1, 10, 3)
    pdf.cell(190, 15, '', 0, 1,)
    simple_table(2, infoTable2, 10, 1)
    pdf.cell(190, 15, '', 0, 1,)
    simple_table(2, infoTable3, 10, 3)

    # page2
    pageLayout()
    pageNumber()
    pdf.set_font('Arial', 'U', 24)
    pdf.cell(190, 10, 'DATA ANALYTICS REPORT', 0, 2, 'C')
    pdf.set_font('Arial', '', 20)
    pdf.cell(190, 5, '', 0, 1,)
    heading1('PERFORMANCE SUMMARY:')
    pdf.multi_cell(190, 5, 'FOR: '+clientName+'\n \nTOPIC: '+clientTopic +
                   '\n \nANALYSIS BY: SSK ENTERPRISES\n \nThe following table contains the summary of the data:\n ', 0, 'L')
    simple_table(2, summaryData, 18, 3)
    pdf.multi_cell(250, 5, "\nSince we now seen the general summary of the dataset let us now dive into so visualizations to\nbetter comprehend how we are performing.\n ", 0, 'L')
    heading1('SENTIMENT PERCENTAGE ON GIVEN DATA:')
    pdf.multi_cell(250, 5,
                   "Here you can view how the sentiments are of individuals with respect to percentage.\nThe x-axis contains the sentiments, the representation being:\n\no -1: negative \no 0: neutral\no 1: positive\nAnd y-axis being the number of tweets from the dataset.\n", 0, 'L')
    pdf.image(os.path.join(str(settings.MEDIA_ROOT) + '/report_images',
                           'performancePercentages_' + code + '.png'), x=pdf.get_x() + 40, y=pdf.get_y() + 10, w=110, h=80)

    # page3
    pageLayout()
    pageNumber()
    heading1('POLARITY DISTRIBUTION:')
    pdf.multi_cell(190, 5,
                   "Now let us take a look at the polarity distribution and the retweets on that tweet, the reason to do so\nwould help us pinpoint which tweets (positive, negative, or neutral) of high intensity have reached or\nengaged with masses.", 0, 'L')
    pdf.image(os.path.join(str(settings.MEDIA_ROOT) + '/report_images',
                           'retweetToPolarity_' + code + '.png'), x=pdf.get_x() + 40, y=pdf.get_y() + 10, w=110, h=80)
    pdf.multi_cell(195, pdf.get_y()+70, '')

    heading1('RETWEET SUMMARY:')
    pdf.multi_cell(190, 5,
                   "Here we will list the retweet summary. The method we used to approximate these numbers is by\nadding the retweet counts of the tweets of same category meaning if someone has retweeted a\nspecific tweet then he has engaged, understood and probably holds the same sentiments regarding\nthe subject under observation.\n  ", 0, 'L')
    simple_table(2, retweetSummaryData, 16, 3)
    pdf.cell(195, 5, '', 0, 2)
    pdf.multi_cell(
        190, 5, "While we are on the subject lets also list the highly negative and positive tweet.\n ", 0, 'L')
    simple_table(2, infoHighest, 14, 5)
    pdf.cell(195, 5, '', 0, 2)

    # page4
    pageLayout()
    pageNumber()
    heading1(
        'COMPARISION OF FOLLOWERS TO REACH RATIO OF TOP 10 MOST FOLLOWED ACCOUNTS:')
    pdf.multi_cell(190, 5, "Firstly we extracted the top ten most followed accounts. Then we checked the engagement of their\ntweet by plotting the bar graph besides the followers bar graph to get a better understanding about\nthe engagement ratio.\nThe yellow colored bar represents retweet count. While the followers graph is represented by\nfollowing scheme:\no Red: indicating that tweet of this account was negative.\no Green: indicating that tweet of this account was positive. ", 0, 'L')
    pdf.image(os.path.join(str(settings.MEDIA_ROOT) + '/report_images',
                           'comparisionFolRec_' + code + '.png'), x=pdf.get_x() + 40, y=pdf.get_y() + 10, w=110, h=80)
    pdf.multi_cell(195, pdf.get_y()+70, '')

    # page5
    pageLayout()
    pageNumber()
    pdf.set_font('Arial', 'U', 24)
    heading1('POLARITY DISTRIBUTION INSIGHTS:')
    pdf.multi_cell(190, 5, "The scatter plot helps in pinpointing the polarity of an individual of a certain language regarding the\ntrend. This helps us in identifying firstly how many individuals of diverse background who converse in different language have taken part in the trend and secondly hold what kind of sentiment with what intensity of the trend at hand.", 0, 'L')
    pdf.image(os.path.join(str(settings.MEDIA_ROOT) + '/report_images',
                           'ScatterPlot_' + code + '.png'), x=pdf.get_x() + 40, y=pdf.get_y() + 10, w=110, h=80)
    pdf.cell(190, 5, '', 0, 1,)
    pdf.multi_cell(190, 5, "The streamlines indicate the mean polarity of different languages, the peaks determine the average \nsentiment of the individuals of the particular language.", 0, 'L')
    pdf.image(os.path.join(str(settings.MEDIA_ROOT) + '/report_images',
                           'PolarityDistAccLang_' + code + '.png'), x=pdf.get_x() + 40, y=pdf.get_y() + 110, w=110, h=80)

    # page6
    pageLayout()
    pageNumber()
    pdf.set_font('Arial', 'U', 24)
    heading1('ANALYTICS OF TEXTUAL FREQUENCIES:')
    pdf.multi_cell(190, 5, "One interesting thing that we can extract are the top 20 most used words from the data, this helps any researcher to describe the trend to anyone within the 20 words limit. The length of the circular bar would represent the frequency of the word used in the dataset.\n\nAnother analytics that can be performed is the visual summary of the whole trend, this would help in determining all the words used by making a word cloud. The bigger the word the more it is used in the trend. As shown in the second figure of this page.", 0, 'L')
    pdf.image(os.path.join(str(settings.MEDIA_ROOT) + '/report_images',
                           'Top20Words_' + code + '.png'), x=pdf.get_x() + 40, y=pdf.get_y() + 10, w=110, h=80)
    pdf.image(os.path.join(str(settings.MEDIA_ROOT) + '/report_images',
                           'WordGraph_' + code + '.png'), x=pdf.get_x() + 40, y=pdf.get_y() + 110, w=110, h=80)

    # page7
    pageLayout()
    pageNumber()
    heading1('PIE CHART OF THE SENTIMENT REACH:')
    pdf.multi_cell(190, 5, "Final thing that we will visualize is the pie chart of the engagement or also referred as \'reach\'.\nTotal engagement on the topic: "+totalReach, 0, 'L')
    pdf.image(os.path.join(str(settings.MEDIA_ROOT) + '/report_images',
                           'pieChartReach_' + code + '.png'), x=1 + 10, y=35, w=190, h=160)
    pdf.multi_cell(195, pdf.get_y()+105, '')
    heading1('CONCLUSION:')
    pdf.multi_cell(
        190, 5, "From the above analysis we can say that the subject is viewed "+conclusionSents, 0, 'L')

    pdf.output(os.path.join(str(settings.MEDIA_ROOT) + '/Reports/twitter_model',
               'SSK-'+clientTopic+'_' + code + '-Analysis-Report.pdf'), 'F')
    # send_mail(clienrEmail, 'SSK-'+clientTopic+'-Analysis-Report.pdf')


def generateReport(sentimentFile, clientName, clientTopic, clienrEmail, code):
    pd, plt, sns, FPDF, np, re, string, word_tokenize, stopwords, PorterStemmer, TweetTokenizer, nltk, WordCloud = libs()
    # data = pd.read_csv(sentimentFile)
    data = sentimentFile
    data['Sentiment'].dropna(inplace=True)

    engagementData, reachData, reachlabels, totalReach = dataExtractor(
        data, pd)
    # print(engagementData,reachData,reachlabels)
    sentimentPercentage(data, pd, plt, sns, code)            # bar graph
    polarityDist(data, pd, plt, sns, code)                   # dot plot
    pieChart(data, pd, plt, sns, reachData,
             reachlabels, code)                       # piechart
    comparsionGraph(data, pd, plt, sns, engagementData, reachData,
                    reachlabels, code)                # comparision grapg
    scatterPlot(data, pd, plt, sns, code)  # scatter plot
    circularBar(data, pd, plt, sns, np, re, string, word_tokenize,
                stopwords, PorterStemmer, TweetTokenizer, nltk, code)  # top 20 words
    # to find out the mean of polarity dist based on lang
    streamChart(data, pd, sns, plt, np, code)
    wordCloud(data, re, string, word_tokenize, stopwords, PorterStemmer,
              TweetTokenizer, nltk, pd, plt, WordCloud, code)  # wordcloud
    infoTable1, infoTable2, infoTable3 = appendixTable()

    summaryData, retweetSummaryData, infoHighest = Summary(data, pd, reachData)
    # print(summaryData,retweetSummaryData,infoHighest)
    conclusionSents = conclusion(data, pd)
    # print(conclusionSents)

    myReport(FPDF, infoTable1, infoTable2, infoTable3, summaryData, retweetSummaryData,
             infoHighest, conclusionSents, totalReach, clientName, clientTopic, clienrEmail, code)

    return totalReach, summaryData
