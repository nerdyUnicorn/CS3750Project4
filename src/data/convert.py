#!/usr/bin/python

import json
from pprint import pprint

with open('allstocks.json') as data_file:    
    data = json.load(data_file)

print('let map = new Map([')

for i in data:
    print('    ["' + i['companySymbol'] + '", "' + i['companyName'] + '"],')

print(']);')
