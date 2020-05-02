#ifndef WORD_H
#define WORD_H

#include "../include/Cell.h"

class Word {
  public:

    // Parameters are first and last letter from the word
    Word(Cell, Cell);

    int getSize(){
      return size;
    }

    // Word destructor
    ~Word();

  private:

    // The coordinates for the first and last letter of the word
    Cell first;
    Cell last;

    // Stores the word size
    int size;
    // Calculates the word size based on the first and last letter coordinates.
    int calculateWordSize();
};

#endif
