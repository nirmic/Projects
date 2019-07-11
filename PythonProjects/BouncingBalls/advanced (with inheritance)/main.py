import pygame
from pygame.locals import *
from ball import *
import sys

pygame.init()

size = (width, height) = (1000, 1000)

screen = pygame.display.set_mode(size)
clock = pygame.time.Clock()
color = (0, 0, 0)
balls = pygame.sprite.Group()


def main():
    global screen
    for i in range(10):
        balls.add(Ball((width / 2, height / 2)))
    while True:
        clock.tick(60)
        for event in pygame.event.get():
            if event.type == QUIT:
                sys.exit()
            if event.type == MOUSEBUTTONDOWN:
                balls.add(Ball(event.pos))
            if event.type == KEYDOWN:
                if event.key == K_d:
                    sprites = balls.sprites()
                    for i in range(len(balls) // 2):
                        sprites[i].kill()
                elif event.key == K_f:
                    screen = pygame.display.set_mode(size, FULLSCREEN)
                elif event.key == K_ESCAPE:
                    screen = pygame.display.set_mode(size)
        balls.update()
        screen.fill(color)
        balls.draw(screen)
        pygame.display.flip()


if __name__ == "__main__":
    main()
