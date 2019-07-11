import random
import pygame
import math
import sys
from pygame.locals import *
from sprite_loader import *
from player import *
from cat import *

pygame.init()
screen_info = pygame.display.Info()
# set the width and height to the size of the screen
size = (width, height) = (screen_info.current_w, screen_info.current_h)
screen = pygame.display.set_mode(size)
clock = pygame.time.Clock()
cat_images = []
man_images = {}


def get_images():
    cat_sheet = SpriteSheet('images/runningcat.png')
    man_sheet = SpriteSheet('images/man.png')
    directions = ['n', 'w', 's', 'e']
    # Get cat images
    for i in range(4):
        for j in range(2):
            cat_images.append(cat_sheet.get_image(j*512, i*256, 512, 256))
            cat_images[-1] = pygame.transform.smoothscale(cat_images[-1], (180, 90))
    # Get man images
    for i in range(len(directions)):
        for j in range(9):
            man_images[directions[i]+str(j)] = man_sheet.get_image(j*64, i*64, 64, 64)


# Creates a background image by stitching together the
# same image enough times to cover the background.
def create_background():
    background = pygame.Surface((width, height))
    bg_img = pygame.image.load("images/ground0.gif")
    for i in range(math.ceil(width / 32)):
        for j in range(math.ceil(height / 32)):
            background.blit(bg_img, (i*32, j*32))
    return background


def main():
    get_images()
    cat = Cat((-90, random.randint(50, height-50)), cat_images)
    player = Player((width//2, height//2), man_images)
    background = create_background()
    while True:
        clock.tick(60)
        for event in pygame.event.get():
            if event.type == QUIT:
                sys.exit()
        keys = pygame.key.get_pressed()
        if keys[K_UP]:
            player.up()
        if keys[K_DOWN]:
            player.down()
        if keys[K_LEFT]:
            player.left()
        if keys[K_RIGHT]:
            player.right()
        player.update()
        cat.update()
        screen.blit(background, (0, 0))
        cat.draw(screen)
        player.draw(screen)
        pygame.display.flip()


if __name__ == "__main__":
    main()
