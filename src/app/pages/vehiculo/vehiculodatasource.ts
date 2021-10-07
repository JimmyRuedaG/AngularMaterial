import { VehiculoService } from '../../_service/vehiculo.service';
import { Vehiculo } from '../../_model/vehiculo';
import { LoaderService } from '../../loader/loader.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';

export class vehiculodatasource implements DataSource<Vehiculo>{

    page = 0;
    size = 3;

    private lessonsSubject = new BehaviorSubject<Vehiculo[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    constructor(private VehService: VehiculoService, public loadService: LoaderService) { }

    connect(collectionViewer: CollectionViewer): Observable<Vehiculo[]> {
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
        this.loadingSubject.complete();
    }

    // loadData(page: number, size: number): void {
    //     this.VehService.getVeh(page, size).pipe(catchError(() => of([])),
    //         finalize(() => this.loadingSubject.next(false))).subscribe(data => { this.lessonsSubject.next(data) });
    // }
}