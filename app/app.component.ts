import { Component, OnInit, ElementRef } from '@angular/core';
declare var $:JQueryStatic;

@Component({
	selector: 'alligator-pagination',
	template: `
		<div class="alligator-pagination">
			<ul *ngIf="pages">
				<li *ngFor="let page of pages" [attr.class]="getClass(page)" 
					[attr.href]="link + '?page=' + getPage(page)">{{ getPage(page) }}</li>
			</ul>
		</div>
	`
})
export class AppComponent implements OnInit {

	private page: number;
	private pageCount: number;
	private pagesToPoints: number;
	
	public link: string;
	public pages: string[];

	public constructor(
		public element: ElementRef
	) {
		
	}

	public ngOnInit() {
		this.pagesToPoints = 4;

		this.page = parseInt($(this.element.nativeElement).attr('page'));
		this.pageCount = parseInt($(this.element.nativeElement).attr('max'));
		this.link = $(this.element.nativeElement).attr('link');

		this.pages = this.render(this.page, this.pageCount, this.pagesToPoints);
	}

	private render(page: number, max: number, pagesToPoints:number): string[] {
		let pages = [];

		if(page < 1 || page > max) { return; }

		if(pagesToPoints > max) {
			let whilePages = max;
			let pagesCounter = 1;

			while(whilePages > 0) {
				pages.push((pagesCounter == page ? pagesCounter + '|active' : pagesCounter + ''));

				whilePages--;
				pagesCounter++;
			}
		}
		else if(page == 1 || page <= pagesToPoints) {

			let whilePages = pagesToPoints;
			let pagesCounter = 1;

			while(whilePages > 0) {
				pages.push((pagesCounter == page ? pagesCounter + '|active' : pagesCounter + ''));

				whilePages--;
				pagesCounter++;
			}

			pages.push('...');
			pages.push(max);
		} else if (page == max || (max - pagesToPoints) <= page) {
			let whilePages = pagesToPoints;

			pages.push('1');
			pages.push('...');

			while(whilePages > 0) {
				pages.push(
					(max - whilePages + 1) == page ? (max - whilePages + 1) + '' + '|active' : (max - whilePages + 1) + ''
				);

				whilePages--;
			}

		} else {
			pages.push('1');
			pages.push('...');
				
			pages.push((page - 1) + '');
			pages.push(page + '|active');
			pages.push((page + 1) + '');

			pages.push('...');
			pages.push(max + '');
		}

		console.log(pages);
		return pages;
	}

	public getPage(page): string {
		if(/active$/.test(page)) {
			return page.replace('|active', '');
		}

		return page;
	}

	public getClass(page): string {
		if(/active$/i.test(page)) {
			return 'active';
		}

		return null;
	}

}
