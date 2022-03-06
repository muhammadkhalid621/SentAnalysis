from .mailing import send_mail
def libs():
    import pandas as pd
    import matplotlib.pyplot as plt
    import seaborn as sns
    from fpdf import FPDF
    return pd, plt, sns, FPDF


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

    return engagementData, reachData, reachlabels, totalReach


def sentimentPercentage(data, pd, plt, sns):

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
    plt.savefig('performancePercentages.png')
    plt.clf()


def polarityDist(data, pd, plt, sns):
    sns.lineplot(x='retweet-count', y='Polarity', data=data, hue='Sentiment',
                 style="Sentiment",
                 palette=['r', 'g'], dashes=False, markers=["X", "."],
                 linewidth=1.5)

    plt.title("Retweet count to polarity ratio", fontsize=20)  # for title
    plt.xlabel("Retweets", fontsize=15)  # label for x-axis
    plt.ylabel("Polarity", fontsize=15)  # label for y-axis
    plt.savefig('retweetToPolarity.png')
    plt.clf()


def pieChart(data, pd, plt, sns, reachData, reachlabels):
    colors = [sns.color_palette('pastel')[1], sns.color_palette('pastel')[
        2], sns.color_palette('pastel')[0]]
    plt.figure(figsize=(15, 8))
    plt.pie(reachData, labels=reachlabels, colors=colors, autopct='%.0f%%')
    plt.savefig('pieChartReach.png')
    plt.clf()


def comparsionGraph(data, pd, plt, sns, engagementData, reachData, reachlabels):
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
    plt.savefig('comparisionFolRec.png')
    plt.clf()


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


def conclusion(data, pd):
    Sentiments = data['Sentiment'].value_counts()

    if Sentiments.idxmax() == -1:
        conclusionSents = 'Negatively'
    elif Sentiments.idxmax() == 1:
        conclusionSents = 'Positively'
    else:
        conclusionSents = 'Neutrally'

    return conclusionSents


def myReport(FPDF, summaryData, retweetSummaryData, infoHighest, conclusionSents, totalReach, clientName, clientTopic, clienrEmail):

    class PDF(FPDF):
        def footer(self):
            # Go to 1.5 cm from bottom
            self.set_y(-15)
            # Select Arial italic 8
            self.set_font('Times', 'I', 8)
            # Print centered page number
            self.cell(0, 10, 'Page %s' % self.page_no(), 0, 0, 'C')

    def simple_table(Spacing, Data, fontSize, cols):
        spacing = Spacing
        data = Data
        pdf.set_line_width(0.5)
        pdf.set_font('Times', '', fontSize)

        col_width = 180 / cols
        row_height = pdf.font_size
        for row in data:
            for item in row:
                print(item)
                pdf.cell(col_width, row_height*spacing,
                         txt=str(item), border=1, align='C')
            pdf.ln(row_height*spacing)

        pdf.set_font('Times', '', 12)

    def pageLayout():
        pdf.add_page()
        pdf.set_line_width(0.2)
        pdf.rect(5, 5, 200, 287, 'D')

    def heading1(text):
        pdf.set_font('Times', 'U', size=20)
        pdf.multi_cell(190, 10, text, 0, 'L')
        pdf.cell(190, 5, '', 0, 1,)
        pdf.set_font('Times', '', 12)

    def pageNumber():
        pdf.set_font('Times', 'I', size=8)
        pdf.text(190, 290, 'Pg '+str(pdf.page_no()-1))
        pdf.set_font('Times', '', size=12)

    # title page

    pdf = FPDF()
    pageLayout()
    pdf.image('./media/images/ssk.jpg', x=40, y=100, w=55, h=50)
    pdf.set_font('Times', '', 18)
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
    pdf.set_font('Times', 'U', 24)
    pdf.cell(190, 10, 'DATA ANALYTICS REPORT', 0, 2, 'C')
    pdf.set_font('Times', '', 20)
    pdf.cell(190, 5, '', 0, 1,)
    heading1('PERFORMANCE SUMMARY:')
    pdf.multi_cell(190, 5, 'FOR: '+clientName+'\n \nTOPIC: '+clientTopic +
                   '\n \nANALYSIS BY: SSK ENTERPRISES\n \nThe following table contains the summary of the data:\n ', 0, 'L')
    simple_table(2, summaryData, 18, 3)
    pdf.multi_cell(250, 5, "\nSince we now seen the general summary of the dataset let us now dive into so visualizations to\nbetter comprehend how we are performing.\n ", 0, 'L')
    heading1('SENTIMENT PERCENTAGE ON GIVEN DATA:')
    pdf.multi_cell(250, 5,
                   "Here you can view how the sentiments are of individuals with respect to percentage.\nThe x-axis contains the sentiments, the representation being:\n\no -1: negative \no 0: neutral\no 1: positive\nAnd y-axis being the number of tweets from the dataset.\n", 0, 'L')
    pdf.image('performancePercentages.png', x=pdf.get_x() +
              40, y=pdf.get_y() + 10, w=110, h=80)

    # page2
    pageLayout()
    pageNumber()
    heading1('POLARITY DISTRIBUTION:')
    pdf.multi_cell(190, 5,
                   "Now let us take a look at the polarity distribution and the retweets on that tweet, the reason to do so\nwould help us pinpoint which tweets (positive, negative, or neutral) of high intensity have reached or\nengaged with masses.", 0, 'L')
    pdf.image('retweetToPolarity.png', x=pdf.get_x() +
              40, y=pdf.get_y() + 10, w=110, h=80)
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

    # page3
    pageLayout()
    pageNumber()
    heading1(
        'COMPARISION OF FOLLOWERS TO REACH RATIO OF TOP 10 MOST FOLLOWED ACCOUNTS:')
    pdf.multi_cell(190, 5, "Firstly we extracted the top ten most followed accounts. Then we checked the engagement of their\ntweet by plotting the bar graph besides the followers bar graph to get a better understanding about\nthe engagement ratio.\nThe yellow colored bar represents retweet count. While the followers graph is represented by\nfollowing scheme:\no Red: indicating that tweet of this account was negative.\no Green: indicating that tweet of this account was positive. ", 0, 'L')
    pdf.image('comparisionFolRec.png', x=pdf.get_x() +
              40, y=pdf.get_y() + 10, w=110, h=80)
    pdf.multi_cell(195, pdf.get_y()+70, '')

    # page4
    pageLayout()
    pageNumber()
    heading1('PIE CHART OF THE SENTIMENT REACH:')
    pdf.multi_cell(190, 5, "Final thing that we will visualize is the pie chart of the engagement or also referred as \'reach\'.\nTotal engagement on the topic: "+totalReach, 0, 'L')
    pdf.image('pieChartReach.png', x=1 + 10, y=35, w=190, h=160)
    pdf.multi_cell(195, pdf.get_y()+105, '')
    heading1('CONCLUSION:')
    pdf.multi_cell(
        190, 5, "From the above analysis we can say that the subject is viewed "+conclusionSents, 0, 'L')

    pdf.output('SSK-'+clientTopic+'-Analysis-Report.pdf', 'F')
    # send_mail(clienrEmail, 'SSK-'+clientTopic+'-Analysis-Report.pdf')


def generateReport(sentimentFile, clientName, clientTopic, clienrEmail):
    pd, plt, sns, FPDF = libs()
    data = pd.read_csv(sentimentFile)
    data['Sentiment'].dropna(inplace=True)

    engagementData, reachData, reachlabels, totalReach = dataExtractor(
        data, pd)
    # print(engagementData,reachData,reachlabels)
    sentimentPercentage(data, pd, plt, sns)            # bar graph
    polarityDist(data, pd, plt, sns)                   # dot plot
    pieChart(data, pd, plt, sns, reachData,
             reachlabels)                       # piechart
    comparsionGraph(data, pd, plt, sns, engagementData, reachData,
                    reachlabels)                # comparision grapg

    summaryData, retweetSummaryData, infoHighest = Summary(data, pd, reachData)
    # print(summaryData,retweetSummaryData,infoHighest)
    conclusionSents = conclusion(data, pd)
    # print(conclusionSents)

    myReport(FPDF, summaryData, retweetSummaryData,
             infoHighest, conclusionSents, totalReach, clientName, clientTopic, clienrEmail)
    
