from PIL import Image
import os

# Input and output paths
# Input and output paths
input_path = r"b:\AI Automation\Website\Canyon Hills Family Dentistry\Daniel DDS\assets\images\favicon-new.png"
output_ico = r"b:\AI Automation\Website\Canyon Hills Family Dentistry\Daniel DDS\Daniel DDS V3\assets\images\favicon.ico"
output_png = r"b:\AI Automation\Website\Canyon Hills Family Dentistry\Daniel DDS\Daniel DDS V3\assets\images\favicon.png"

# Open the image
img = Image.open(input_path)

# Convert to RGBA if not already
if img.mode != 'RGBA':
    img = img.convert('RGBA')

# Create multiple sizes for ICO - standard sizes with 32x32 as primary
sizes = [(16, 16), (32, 32), (48, 48)]
img.save(output_ico, format='ICO', sizes=sizes)

# Save optimized PNG at 32x32
img_32 = img.resize((32, 32), Image.Resampling.LANCZOS)
img_32.save(output_png, format='PNG', optimize=True)

print("Favicon created successfully at 32x32!")
print(f"ICO: {output_ico} (16x16, 32x32, 48x48)")
print(f"PNG: {output_png} (32x32)")
