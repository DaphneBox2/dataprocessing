#!/usr/bin/env python
# Name: Daphne Box
# Student number: 10455701
'''
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
'''
import csv

from pattern.web import URL, DOM

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'
result = []


def extract_tvseries(dom):
    '''
    Extract a list of highest rated TV series from DOM (of IMDB page).

    Each TV series entry should contain the following fields:
    - TV Title
    - Rating
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    '''
    
    # Inspiration about how to scrap the IMDB website is obtained from: 
    #"http://mlwhiz.com/blog/2014/10/02/data_science_101_python_pattern/"

    # Go inside the html file and go to the header in which all the data 
    # from one movies is stored
    for f in dom.by_tag("div.lister-item-content"):
        title = f.by_tag("a")[0].content.encode('utf-8')
            
        # Check if run time for serie if given, if so show minutes only else 
        # leave empty
        runtime = f.by_tag("span.runtime")
        if runtime == []:
            runtime = ""
        else:   
            pre_runtime = f.by_tag("span.runtime")[0].content.encode('utf-8')
            number_only_runtime = pre_runtime.split(" ")
            runtime = number_only_runtime[0]

        # Get genre without \n first
        prepre_genres = f.by_tag("span.genre")[0].content.encode('utf-8')
        pre_genres = prepre_genres.split("\n")
        genres = pre_genres[1]
        rating = f.by_tag("strong")[0].content.encode('utf-8')
        
        # Get first all actors and put them together separated with a comma
        actors = f.by_tag("p")[2].by_tag("a")
        actors = ", ".join([p.content for p in actors]).encode('utf-8')
        
        # Put all the data together
        temp_res = []
        temp_res.extend([title, genres, runtime, rating, actors])
        result.append(temp_res)
    
    # Return all the data
    return [result]


def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest rated TV-series.
    '''
    writer = csv.writer(f)
    
    # Make headers for all colums
    writer.writerow(['title', 'genres', 'runtime', 'rating', 'actors'])
    
    # Write all the data in sublists to the appropriate cell
    for item in tvseries:
        for sublist in item:
            writer.writerow(sublist)

if __name__ == '__main__':
    
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()
    #dom = DOM(url.download(cached=True))

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)    
