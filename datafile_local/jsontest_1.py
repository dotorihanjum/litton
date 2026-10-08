import csv

input_file = 'campusmajor.csv'
output_file = 'output.csv'

target_columns = ['시도명', '학교명', '수업연한', '학과명', '주요교과목명', '대학자체계열명', '학과상태명']

with open(input_file, 'r', encoding='utf-8') as infile, \
     open(output_file, 'w', newline='', encoding='utf-8') as outfile:
    
    reader = csv.DictReader(infile)

    writer = csv.DictWriter(outfile, fieldnames=target_columns)
    writer.writeheader()
    
    school_name = set()
    field_name = set()
    for row in reader:
        filtered_row = {col: row[col] for col in target_columns}
        if(filtered_row['학과상태명'] != '폐과'):
            writer.writerow(filtered_row)
            school_name.add(filtered_row['학교명'])
            field_name.add(filtered_row['대학자체계열명'])

    with open('schoolfile.csv','w', newline='', encoding='utf-8') as schoolfile:
        writer = csv.writer(schoolfile)
        writer.writerow(school_name)
    
    schoolfile.close()

    with open('fieldfile.csv', 'w', newline='', encoding='utf-8') as fieldfile:
        writer = csv.writer(fieldfile)
        writer.writerow(field_name) 
    fieldfile.close()
        
    
    