const db = require('../../config/db')

const Base = require('./Base')

Base.init({
  table: 'Player_Stats'
})

module.exports = {
    ...Base,
    async findByPlayerId(id) {
        return new Promise((resolve, reject) => {
            const query = `
                    select * from player_stats ps 
                    left join player p on p.playerID = ps.fk_Player_PlayerID 
                    left join season s on s.Start_Year  = fk_Season_Start_Year and s.Season_Type = fk_Season_Season_Type 
                    where p.PlayerID = ?
                `;

                db.query(query, [id], function (error, results){
                    if(error)
                        return reject('Erro na consulta')
                    const resultados = JSON.parse(JSON.stringify(results))
                    return resolve(resultados)
                })
        })
    },
    async findPlayer(search) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT p.PlayerID, p.PlayerName 
                FROM player p 
                WHERE PlayerName LIKE CONCAT('%', ?, '%')
            `
            db.query(query, [search], function (error, results){
                if(error){
                    return reject('Erro na consulta')
                }
                const resultados = JSON.parse(JSON.stringify(results))
                return resolve(resultados)
            })
        })
    },
    async moreThanHundredSeasons() {
        return new Promise((resolve, reject) => {
            const query = `
                Select Team_Acronym, count(distinct fk_Season_Start_Year, fk_Season_Season_Type) as Seasons_Count
                from team
                inner join jogou_season_team_player on fk_Team_Team_ID = Team_ID
                group by Team_ID
                having count(distinct fk_Season_Start_Year, fk_Season_Season_Type) > 100
            `
            db.query(query, function (error, results){
                if(error){
                    return reject('Erro na consulta')
                }
                const resultados = JSON.parse(JSON.stringify(results))
                return resolve(resultados)
            })
        })
    },
    async moreThanThirtySeasons() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT PlayerName, temporadasRegularesEPlayOffs as Seasons_Count, fk_Player_PlayerID as id FROM (
                    SELECT 
                        PlayerName,
                        fk_Player_PlayerID,
                        COUNT(fk_Player_PlayerID) AS temporadasRegularesEPlayOffs
                    FROM
                        jogou_season_team_player
                            INNER JOIN
                        player ON PlayerID = jogou_season_team_player.fk_Player_PlayerID
                    GROUP BY fk_Player_PlayerID) as subquery
                WHERE temporadasRegularesEPlayOffs > 30
                order by 2 desc;
            `
            db.query(query, function (error, results){
                if(error){
                    return reject('Erro na consulta')
                }
                const resultados = JSON.parse(JSON.stringify(results))
                return resolve(resultados)
            })
        })
    },
    async bestPlayers() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                p.PlayerName, jstp.fk_Season_Start_Year as Season , Points_Scored as Pontos, Games_Played as Jogos,
                p.playerID as id
                FROM
                    jogou_season_team_player AS jstp
                        INNER JOIN
                    player_stats AS ps ON jstp.fk_Season_Start_Year = ps.fk_Season_Start_Year
                        AND ps.fk_Player_PlayerID = jstp.fk_Player_PlayerID
                        AND ps.fk_Season_Season_Type LIKE '%Regular%'
                        LEFT JOIN player p on p.PlayerID = ps.fk_Player_PlayerID 
                
                WHERE Points_Scored > 2500 and jstp.fk_Season_Season_Type = 'Regular Season'
                order by 3 desc;
            `
            db.query(query, function (error, results){
                if(error){
                    return reject('Erro na consulta')
                }
                const resultados = JSON.parse(JSON.stringify(results))
                return resolve(resultados)
            })
        })
    },
    async bestTeams() {
        return new Promise((resolve, reject) => {
            const query = `
                Select Team_Acronym, count(distinct fk_Season_Start_Year, fk_Season_Season_Type) as Seasons_Count
                from team
                inner join jogou_season_team_player on fk_Team_Team_ID = Team_ID
                group by Team_ID
                having count(distinct fk_Season_Start_Year, fk_Season_Season_Type) > 100
                order by 2 desc;
            `
            db.query(query, function (error, results){
                if(error){
                    return reject('Erro na consulta')
                }
                const resultados = JSON.parse(JSON.stringify(results))
                return resolve(resultados)
            })
        })
    }
}