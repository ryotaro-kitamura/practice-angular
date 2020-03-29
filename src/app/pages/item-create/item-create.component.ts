import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleFormValue } from '../../shared/models';
import { ItemListService } from '../item-list/item-list.service';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemCreateComponent implements OnInit {
  image: any = null;
  previewImageSrc: string = '';

  itemCreateForm: FormGroup = this.fb.group({
    title: [''],
    contents: ['']
  });

  constructor(
    private fb: FormBuilder,
    private itemListService: ItemListService,
    private route: Router
  ) {}

  ngOnInit() {}

  onImageUpload(event: Event): void {
    this.image = event.target['files'];

    const reader = new FileReader();
    reader.onload = e => {
      this.previewImageSrc = e.target['result'];
    };
    reader.readAsDataURL(event.target['files'][0]);
  }

  async onSubmit(formValue: ArticleFormValue) {
    await this.itemListService.createArticle(formValue, this.image);
    this.route.navigateByUrl('/list');
  }
}
