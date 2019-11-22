import { Player } from './../../shared2/player';
import { ApiService } from './../../shared2/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})

export class PlayersListComponent implements OnInit {
  PlayerData: any = [];
  dataSource: MatTableDataSource<Player>;
  player: string;
  
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  // displayedColumns: string[] = ['_id', 'player_name', 'student_email', 'section', 'action'];
  displayedColumns: string[] = ['player', 'rank', 'score', 'time','games_played','status','action'];

  constructor(private playerApi: ApiService) {
    this.playerApi.GetPlayers().subscribe(data => {
      this.PlayerData = data;
      this.dataSource = new MatTableDataSource<Player>(this.PlayerData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }

  deletePlayer(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.playerApi.DeletePlayer(e._id).subscribe()
    }
  }

  Search(){
    
    // this.dataSource.data = this.dataSource.data.filter(res=>{
    //     console.log(res.player.toLocaleLowerCase());

    //     return res.player.toLocaleLowerCase().match(this.PlayerData);
    //   })
    // const playerName = this.player;
    // const found = this.PlayerData.find(player => this.player > 10);

    this.PlayerData = this.PlayerData.filter(res=>{
      return res.player.toLocaleLowerCase().match(this.PlayerData.find(this.player));
    })


  }


}