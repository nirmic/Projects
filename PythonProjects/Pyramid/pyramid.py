import pygame, sys
from pygame.locals import *
from deck import *

pygame.init()

# sets width and height to the dimensions of any screen
size = (width, height) = (700, 500)

screen = pygame.display.set_mode(size)
clock = pygame.time.Clock()
bg_color = (0, 102, 0)
deck = None
selected_card = pygame.sprite.GroupSingle()
board = pygame.sprite.Group()
discard_pile = pygame.sprite.Group()
top_card = pygame.sprite.GroupSingle()
next_card = pygame.sprite.GroupSingle()
empty_deck = pygame.Rect(0, 0, 71, 94)
empty_deck.bottomleft = (20, height - 20)
font = pygame.font.SysFont("vivaldi", 100)
font2 = pygame.font.SysFont("vivaldi", 50)
restart_text = font2.render("Restart", True, (179, 0, 0))
restart_rect = restart_text.get_rect()
restart_rect.bottomright = (width-20, height-20)


def init():
    global deck
    deck = Deck()
    board.empty()
    discard_pile.empty()
    top_card.empty()
    selected_card.empty()
    for i in range(7):
        for j in range(i+1):
            card = deck.deal()
            card.rect.midtop = (width//2-40*i + 80*j, 30 + 30*i)
            card.flip()
            board.add(card)
    next_card.add(deck.deal())
    next_card.sprite.rect.bottomleft = (20, height-20)


def get_next_card():
    if len(top_card) > 0:
        top_card.sprite.rect.x += 80 + 10*len(discard_pile)
        discard_pile.add(top_card)
    top_card.add(next_card)
    top_card.sprite.flip()
    top_card.sprite.rect.x += 80
    card = deck.deal()
    if card is not None:
        next_card.add(card)
        next_card.sprite.rect.bottomleft = (20, height - 20)
    else:
        next_card.empty()


def reset_pile():
    discard_pile.add(top_card)
    deck.add_cards(discard_pile)
    discard_pile.empty()
    top_card.empty()
    card = deck.deal()
    if card is not None:
        next_card.add(card)
        next_card.sprite.rect.bottomleft = (20, height - 20)
    else:
        next_card.empty()


def check_remove(card_clicked):
    if len(selected_card) > 0 and selected_card.sprite.rank + card_clicked.rank == 13:
        selected_card.sprite.kill()
        card_clicked.kill()
    elif card_clicked.rank == 13:
        selected_card.empty()
        card_clicked.kill()
    else:
        selected_card.add(card_clicked)


def check_sprite_clicked(x, y):
    card_clicked = None
    if restart_rect.collidepoint(x, y):
        init()
        return
    if len(next_card) > 0:
        if next_card.sprite.rect.collidepoint(x, y):
            selected_card.empty()
            get_next_card()
            return
    elif empty_deck.collidepoint(x, y):
        reset_pile()
        return
    if len(top_card) > 0 and top_card.sprite.rect.collidepoint(x, y):
        card_clicked = top_card.sprite
        check_remove(card_clicked)
    elif len(discard_pile) > 0 and discard_pile.sprites()[-1].rect.collidepoint(x, y):
        card_clicked = discard_pile.sprites()[-1]
        check_remove(card_clicked)
    else:
        for card in board:
            if card.rect.collidepoint(x, y):
                card_clicked = card
        if card_clicked is not None:
            hit_list = pygame.sprite.spritecollide(card_clicked, board, False)
            for card in hit_list:
                if card.rect.y > card_clicked.rect.y:
                    return
            check_remove(card_clicked)


def main():
    global screen
    init()
    while True:
        clock.tick(60)
        for event in pygame.event.get():
            if event.type == QUIT:
                sys.exit()
            if event.type == KEYDOWN:
                # screen controls
                if event.key == K_f:
                    screen = pygame.display.set_mode(size, FULLSCREEN)
                elif event.key == K_ESCAPE:
                    screen = pygame.display.set_mode(size)
            if event.type == MOUSEBUTTONDOWN:
                if event.button == 1:
                    x, y = event.pos
                    check_sprite_clicked(x, y)
        screen.fill(bg_color)
        board.draw(screen)
        top_card.draw(screen)
        next_card.draw(screen)
        discard_pile.draw(screen)
        if len(selected_card) == 1:
            pygame.draw.rect(screen, (204, 173, 0), selected_card.sprite.rect, 3)
        if len(next_card) == 0:
            pygame.draw.rect(screen, (0, 0, 0), empty_deck, 3)
        if len(board) == 0:
            win_text = font.render("You Win!", True, (255, 255, 255))
            win_rect = win_text.get_rect()
            win_rect.center = (width//2, height//2)
            screen.blit(win_text, win_rect)
        screen.blit(restart_text, restart_rect)
        pygame.display.flip()


if __name__ == "__main__":
    main()
