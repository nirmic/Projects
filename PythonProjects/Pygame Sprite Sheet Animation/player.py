import pygame


class Player(pygame.sprite.Sprite):
    def __init__(self, pos, images):
        super().__init__()
        self.images = images
        self.image = images["s0"]
        self.rect = self.image.get_rect()
        self.rect.center = pos
        self.speed = [0, 0]
        self.heading = "s"

    def update(self):
        if self.speed[0] != 0 or self.speed[1] != 0:
            frame = pygame.time.get_ticks() // 100 % 9
            self.image = self.images[self.heading + str(frame)]
        else:
            self.image = self.images[self.heading + "0"]
        self.rect.move_ip(self.speed)
        self.speed = [0, 0]

    def draw(self, screen):
        screen.blit(self.image, self.rect)

    def up(self):
        self.heading = "n"
        self.speed[1] = -2

    def down(self):
        self.heading = "s"
        self.speed[1] = 2

    def left(self):
        self.heading = "w"
        self.speed[0] = -2

    def right(self):
        self.heading = "e"
        self.speed[0] = 2
