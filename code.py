# -*- coding: utf-8 -*-
import numpy as np
import pandas as pd
import difflib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

movies_data = pd.read_csv('movies.csv')
movies_data.head()
movies_data.shape
selected_features = ['genres','keywords','tagline','cast','director']
for feature in selected_features:
  movies_data[feature] = movies_data[feature].fillna('')
combined_features = movies_data['genres']+' '+movies_data['keywords']+' '+movies_data['tagline']+' '+movies_data['cast']+' '+movies_data['director']
vectorizer = TfidfVectorizer()
feature_vectors = vectorizer.fit_transform(combined_features)
similarity = cosine_similarity(feature_vectors)


# movie_name= 'batman'
import sys
movie_name=str(sys.argv[1])

list_of_all_titles = movies_data['title'].tolist()
find_close_match = difflib.get_close_matches(movie_name, list_of_all_titles)
close_match = find_close_match[0]
index_of_the_movie = movies_data[movies_data.title == close_match]['index'].values[0]
similarity_score = list(enumerate(similarity[index_of_the_movie]))
len(similarity_score)
sorted_similar_movies = sorted(similarity_score, key = lambda x:x[1], reverse = True) 
i = 1

res=[]
for movie in sorted_similar_movies:
  if (i<=10):
    index = movie[0]
    title_from_index = movies_data[movies_data.index==index]['title'].values[0]
    res.append({"title":title_from_index,"index":index})
  i+=1

#scrap purpose
# movieIndex=0
# while movieIndex<=4802:
#   title_from_index = movies_data[movies_data.index==movieIndex]['title'].values[0]
#   res.append(title_from_index)
#   movieIndex+=1


import json
print(json.dumps(res),end='')