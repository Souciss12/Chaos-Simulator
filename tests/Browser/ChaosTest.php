<?php

uses()->group('browser');

it('Active le fan et fireplace correctement', function () {
    $page = visit('/');

    $page->assertSee('Chaos Simulator')
        ->click('Niveau du jour')
        ->wait(1)
        ->click('.fan')
        ->wait(1)
        ->click('.fan')
        ->click('.fireplace')
        ->wait(1)
        ->click('.fireplace')
        ->wait(1)
        ->click('Menu')
        ->wait(1)
        ->assertSee('Chaos Simulator');
});
