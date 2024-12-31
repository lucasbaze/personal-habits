from PIL import Image, ImageDraw
import os

def create_icon(size):
    # Create a new image with a white background
    image = Image.new('RGBA', (size, size), (255, 255, 255, 0))
    draw = ImageDraw.Draw(image)
    
    # Draw a rounded rectangle
    padding = size // 4
    box_size = size - (padding * 2)
    draw.rounded_rectangle(
        [padding, padding, size - padding, size - padding],
        radius=size//8,
        fill='#4285f4'  # Google Blue
    )
    
    # Draw check mark
    check_points = [
        (size * 0.3, size * 0.5),
        (size * 0.45, size * 0.65),
        (size * 0.7, size * 0.35)
    ]
    draw.line(check_points, fill='white', width=size//8)
    
    return image

def main():
    # Create icons directory if it doesn't exist
    if not os.path.exists('icons'):
        os.makedirs('icons')
    
    # Generate icons in different sizes
    sizes = [16, 48, 128]
    for size in sizes:
        icon = create_icon(size)
        icon.save(f'icons/icon{size}.png')
        print(f'Generated {size}x{size} icon')

if __name__ == '__main__':
    main() 