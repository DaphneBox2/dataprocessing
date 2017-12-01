# # Daphne Box
# # 10455701
# # Transforms a csv file to JSON format

import csv
import json

# open the input and output file
input_file = open("Weather_Kuopio_Holland_2.csv", "r")
output_file = open("weather_Kuopio_Amsterdam_2.json", 'w')

# read the file
reader = csv.reader(input_file, delimiter = ",", quoting = csv.QUOTE_NONE)
print(reader)


fieldnames = ["place", "months", "upper_temperature", "lower_temperature", "average_temperature", "hours_sunshine", "artificial_date"]
print(fieldnames)
data = []
count = 0

# loop through the reader and put the data in correct format
# put them all together in an array and write them to the out-put file
for row in reader:
	if count > 0:
		i = 0
		if row[0] != "":
			out = ({fieldnames[0] : row[0], fieldnames[1] : row[1], fieldnames[2] : row[2], fieldnames[3] : row[3], fieldnames[4] : row[4], fieldnames[5] : row[5], fieldnames[6] : row[6]})
			data.append(out)
	count += 1
data_write = (json.dumps(data, output_file))
output_file.write(data_write)
		
