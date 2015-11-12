'use strict';

var panels;
var isCarousel;
var indexes = {
    previous: null,
    current: null,
    next: null
};

class AnimatedTabsService {

    static init(_panels, _startIndex, _isCarousel) {
        panels = _panels;
        isCarousel = _isCarousel || false;
        indexes.current = _startIndex || 0;

        calculateSideIndexes(indexes.current);
        return indexes;
    }

    static moveNext() {
        indexes.current = indexes.next;
        calculateSideIndexes(indexes.current);
        return indexes;
    }

    static movePrevious() {
        indexes.current = indexes.previous;
        calculateSideIndexes(indexes.current);
        return indexes;
    }

    static forceMoveToIndex(index) {
        if (index > indexes.current) {
            indexes.next = index
        }
        else {
            indexes.previous = index;
        }
        return indexes;
    }
}

function calculateSideIndexes(current) {
    if (!isCarousel) {
        indexes.previous = current > 0 ? current - 1 : null;
        indexes.next =  current < panels.length - 1 ? current + 1 : null;
    }
    else {
        indexes.previous = current > 0 ? current - 1 : panels.length - 1;
        indexes.next =   current < panels.length - 1 ? current + 1 : 0;
    }
}

module.exports = AnimatedTabsService;
