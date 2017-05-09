import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Message} from '../../share/model/message.model';
import {Contact} from '../../share/model/contact.model';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  @ViewChild('scrollChat') private scrollContainer: ElementRef;
  sentMessage: Message;
  sentMessage2: Message;
  recvMe: Message;
  recvMessage: Message;
  recvMessage2: Message;
  recvMessage3: Message;
  recvMessage4: Message;
  me: Contact;
  inContact: Contact;

  ngOnInit(): void {}

  constructor() {
    const timer = Observable.timer(170).subscribe(() => this.scrollToBottom());
    this.me = new Contact(1, 'me', 'as', 'asd', 'asd');
    this.inContact = new Contact(2, 'Rainer Winkler', 'as', 'asd', 'asd');
    this.sentMessage = new Message(1, new Date(), this.me, 'Meddl Leudde ' + String.fromCodePoint(0x1F918));
    this.recvMe = new Message(1, new Date(), this.me, 'Meddl Leudde #unbesiegt http://altschauerberganzeiger.com/');
    this.recvMessage = new Message(1, new Date(), this.inContact, 'Ich weiß, dass n ' +
      'paar Arschlöcher da draußen meinen, ich sei das letzte Arschloch und der letzte Kaschber un Dreggsagg un' +
      ' was-weiß-ich alles - ich hab heut einen Aufruf an euch kleinen miesen Dreggsschweine: Irgendeiner - ich weiß' +
      ' es net wer, es is mir auch scheißegal - ich weiß nicht, wer es war, irgendjemand hat meine Schwester mit ner' +
      ' PC-Kombjuderstimme angrufen und gemeint: Pass auf, ich weiß, wo du wohnst. WER auch immer des war:' +
      'traut euch, kommt zu mir, Altschauerberg 8, in 91448 Emskirchen.');
    this.sentMessage2 = new Message(1, new Date(), this.inContact, 'Meddl'
      + String.fromCodePoint(0x1F918) + String.fromCodePoint(0x1F918) + String.fromCodePoint(0x1F918));
    this.recvMessage2 = new Message(1, new Date(), this.inContact, 'Traut euch, kommt zu mir und legt euch mit mir an,' +
      ' ich brügel die Scheiße aus euch raus. Wenn jemand meint, er kann meine Familie beleidigen, oder irgend...wie... ' +
      'meint.. jemanden zu- fertigzumachen');
    this.recvMessage3 = new Message(1, new Date(), this.inContact, 'ja, der NIX damit zudun hat mit dieser Scheiße, ja, ' +
      'dann soll er herkommen, ich schlag ihm so die... Ich scha- schmeiß ihm so die Brügel raus, dass der NIE wieder ' +
      'aufsteht, ich hab keine' +
      ' Angst von euch kleinen PISSERN. Und wenn jemand meint - ernsthaft meint - dass ICH nix kann, nur weil ich dick' +
      ' bin, und weil ich, weil ich vielleicht a Kaschberla bin für euch, ich sach euch was: Meddla sind wesentlich' +
      ' stärker als BILLISCHE KLEINE KAGGNAZIS! ');

    this.recvMessage4 = new Message(1, new Date(), this.inContact, 'TRAUT EUCH, KOMMT ZU MIR UND MACHT MICH FEDDICH, ' +
      'WENN IHR MEINT! ABER LASST ANDRE LEUDE DA RAUS, DAS IS GENAU DIE SCHEIßE, AUF DIE ICH KEINEN BOCK HAB! UND WENN' +
      ' EINER MEINT, MEINE SCHWESTER ANZUGREIFEN ODER MEINE FAMILIE ODER FREUNDE, ODER GAMER ODER IRGENDJEMAND UND ICH ' +
      'BIN IN DER NÄHE, ICH BRÜGEL DIE SCHEIßE SO AUS IHM RAUS, DASS ER NIE WIEDER AUFSTEHT, UN ICH SCHWÖR EUCH: ' +
      'IHR HABT KEINE CHANCE! TRAUT EUCH, KOMMT ZU MIR!');
  }


  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }
}
