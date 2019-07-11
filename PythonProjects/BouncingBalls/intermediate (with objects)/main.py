import sys, pygame
from pygame.locals import *
from ball import *

pygame.init()

screen_info = pygame.display.Info()
screen_size = (screen_info.current_w, screen_info.current_h)

size = (width, height) = (850, 480)
screen = pygame.display.set_mode(size)
clock = pygame.time.Clock()

color = (26, 255, 255)
balls = []


def main():
    for i in range(10):
        balls.append(Ball((width / 2, height / 2)))
    while True:
        clock.tick(60)
        for event in pygame.event.get():
            if event.type == QUIT:
                sys.exit()
            if event.type == MOUSEBUTTONDOWN:
                balls.append(Ball(event.pos))
            if event.type == KEYDOWN:
                if event.key == K_d:
                    for i in range(len(balls) // 2):
                        balls.pop(0)
                if event.key == K_f:
                    pygame.display.set_mode(screen_size, FULLSCREEN)
                if event.key == K_ESCAPE:
                    pygame.display.set_mode(size)

        screen.fill(color)
        for ball in balls:
            ball.update()
        for ball in balls:
            ball.draw(screen)
        pygame.display.flip()


if __name__ == '__main__':
    main()
