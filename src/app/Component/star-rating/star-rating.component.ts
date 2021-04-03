import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {

  @Input() rating:number;
  starwidth:number;
  ngOnChanges(): void {
     this.starwidth=this.rating*(86/5);
  }

  ngOnInit(): void {
  }

}
