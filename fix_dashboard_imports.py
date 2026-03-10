import os

file_path = r"d:\AventIQ\FullStackProject\newnewnewapp - Copy - Copy - Copy\src\app\dashboard\page.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

redux_imports = [
    'import { useSelector } from "react-redux";\n',
    'import { RootState } from "@/store/store";\n',
    'import { type Goal } from "@/store/goalsSlice";\n'
]

# Find and remove them
new_lines = []
found_count = 0
for line in lines:
    if line in redux_imports:
        found_count += 1
        continue
    new_lines.append(line)

# If not found exactly, try without \n or different spacing
if found_count < 3:
    redux_imports_alt = [i.strip() for i in redux_imports]
    new_lines = []
    found_count = 0
    for line in lines:
        if line.strip() in redux_imports_alt:
            found_count += 1
            continue
        new_lines.append(line)

# Insert after existing imports (around line 36)
insert_pos = 0
for i, line in enumerate(new_lines):
    if line.startswith('import { PageContainer }'):
        insert_pos = i + 1
        break

if insert_pos > 0:
    for i, imp in enumerate(reversed(redux_imports)):
        new_lines.insert(insert_pos, imp)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"Fixed {found_count} imports in {file_path}")
