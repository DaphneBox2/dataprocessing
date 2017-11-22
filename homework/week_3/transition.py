# # Daphne Box
# # 10455701
# # Transforms a csv file to JSON format

import csv
import json

# open the input and output file
input_file = open("rain1998.csv", "r")
output_file = open("weather1998.json", 'w')

# read the file
reader = csv.reader(input_file, delimiter = ",", quoting = csv.QUOTE_NONE)


fieldnames = ["month", "rain"]
data = []
count = 0

# loop through the reader and put the data in correct format
# put them all together in an array and write them to the out-put file
for row in reader:
	if count > 0:
		i = 0
		out = ({fieldnames[0] : row[0], fieldnames[1] : row[1]})
		data.append(out)
	count += 1
data_write = (json.dumps(data, output_file))
output_file.write(data_write)
		
