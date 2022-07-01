from fpdf import FPDF
import pandas as pd
import os
from django.conf import settings


def suspect_list(suspect_file):
    suspect = pd.read_csv(suspect_file)
    final_list = []
    a = list(suspect)
    df_new = suspect[suspect['description'].notnull()]
    # df_new['description'] = df_new['description'].apply(lambda x : x.rsplit(maxsplit=5)[:5])
    for i in range(len(suspect['Unnamed: 0'])):
        l = []
        l.append([a[0], suspect['Unnamed: 0'][i]])
        l.append([a[1], suspect['no of following'][i]])
        l.append([a[2], suspect['no of followers'][i]])
        l.append([a[3], suspect['join date'][i]])
        l.append([a[4], suspect['birthdate'][i]])
        l.append([a[5], suspect['location'][i]])
        l.append([a[6], suspect['website'][i]])
        l.append([a[7], suspect['description'][i]])
        final_list.append(l)
    print(final_list)
    return final_list


def suspect_urls_list(urls_file):
    df = pd.read_csv(urls_file)
    cust_counts = df['Username'].value_counts()
    cust_list = cust_counts[cust_counts > 0].index.tolist()
    print(cust_list)
    li = []
    df_new = df[df['Embedded_text'].notnull()]
    df_new['Embedded_text'] = df_new['Embedded_text'].apply(
        lambda x: x.rsplit(maxsplit=5)[:5])
    for i in range(len(cust_list)):
        li.append(df[['Embedded_text', 'Tweet URL']]
                  [df['Username'] == cust_list[i]].values.tolist())
    return li, cust_list


def myReport(FPDF, final_list, li, code, csv_file_name, cust_list):

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

        col_width = pdf.w / 2.2
        row_height = pdf.font_size
        for row in data:
            for item in row:
                print(item)
                pdf.cell(col_width, row_height*spacing,
                         txt=str(item), border=1)
            pdf.ln(row_height*spacing)

        pdf.set_font('Arial', '', 10)

    def pageNumber():
        pdf.set_font('Arial', 'I', size=8)
        pdf.text(190, 290, 'Pg '+str(pdf.page_no()-1))
        pdf.set_font('Arial', '', size=12)

    def pageLayout():
        pdf.add_page()

    # title page

    pdf = FPDF()
    pageLayout()
    pdf.image(os.path.join(str(settings.MEDIA_ROOT),
              'ssk.jpg'), x=80, y=30, w=50, h=50)
    pdf.add_font("Arial", "", "./media/fonts/arial.ttf", uni=True)
    pdf.set_font('Arial', '', 30)
    pdf.set_text_color(31, 246, 95)
    pdf.text(60, 100, 'TWITTER CYBER')
    pdf.text(75, 115, 'PROFILING')

    text = ['The following report contains the information and potential',
            'evidence of the top five suspects that are tracked from the social',
            'media platform namely twitter.']
    pdf.set_font('Arial', '', 14)
    pdf.set_text_color(0, 0, 0)
    pdf.text(40, 140, text[0])
    pdf.text(37, 145, text[1])
    pdf.text(75, 150, text[2])

    pdf.set_font('Arial', 'BU', 20)
    pdf.set_text_color(0, 0, 0)
    pdf.text(10, 220, 'DISCLAIMER:')
    discText = ['SSK Enterprises only scraped the profiles of the potential suspects on the',
                'basis of the predictions of the machine learning model. We do not hold any',
                'prejudice againstany of the following individual, this document is to be used',
                'only for fair use, humanintervention to regard the subject as hostile or not ',
                'is strongly advised. The informationof the subject may also vary depending ',
                'upon the restrictions imposed on their main profile.']

    pdf.set_font('Arial', '', 12)
    for i in range(len(discText)):
        pdf.text(30, 230 + i*6, discText[i])

    pageLayout()
    pageNumber()

    for i in range(len(cust_list)):
        pdf.set_font('Arial', '', 20)
        pdf.text(10, 10, 'PERSON OF INTEREST #{0}'.format(i+1))

        pdf.set_font('Arial', 'U', 16)
        pdf.text(10, 20, 'BASIC INFORMATION:')

        pdf.set_font('Arial', '', 12)

        pdf.text(
            20, 30, 'Dependency of the information disclosed, gathered and presented on the amount of ')
        pdf.text(25, 35, 'restriction imposed by the subject.')
        pdf.multi_cell(0, 40, '', 0, 'L')
        simple_table(2, final_list[i], 11, len(final_list[i]))

        pdf.set_font('Arial', 'U', 16)
        pdf.text(10, 120, 'RECENT TWEETS:')

        pdf.set_font('Arial', '', 12)
        pdf.text(
            20, 130, 'This table contains the last few tweets which may or may not be regarded as evidence, ')
        pdf.text(
            20, 135, 'however if assumed as evidence, a systematic form would be readily available.')
        pdf.text(
            20, 145, 'A link to the tweets that are collected is also provided if needed to be checked manually.')
        pdf.multi_cell(60, 40, '', 0, 'L')

        simple_table(2, li[i][0:20], 8, len(li[i]))

        if not (i == (len(cust_list))-1):
            pageLayout()
            pageNumber()
        try:
            if (font['cw'][cid] == 0):
                continue
        except:
            continue

    pdf.output(os.path.join(str(settings.MEDIA_ROOT) + '/Reports/twitter_profiling',
               'SSK-'+csv_file_name+'_' + code + '-Profiling-Report.pdf'), 'F')


def create_report(final_list, li, code, csv_file_name, cust_list):
    # cust_list, li = suspect_urls_list(urls_file)
    # final_list = suspect_list(suspect_file)
    myReport(FPDF, final_list, li, code, csv_file_name, cust_list)
    print(final_list)
    print(li)
