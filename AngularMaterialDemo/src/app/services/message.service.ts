import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) {}

  onSucess() {
    this.snackBar.open('Operação realizada com sucesso!', 'X', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['green-snackbar'],
    });
  }

  onError() {
    this.snackBar.open('Erro ao realizar operação!', 'X', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['red-snackbar'],
    });
  }
}
