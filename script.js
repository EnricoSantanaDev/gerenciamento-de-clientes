// URL base da API do CrudCrud
// Substitua YOUR_API_KEY pela chave gerada no CrudCrud
const API_URL = 'https://crudcrud.com/api/3c7a18badfc54da498d95a1bc3f7c9da/customers';

// Elementos do DOM
const clienteForm = document.getElementById('clienteForm');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const clientesList = document.getElementById('clientesList');

// Função para carregar e exibir os clientes
async function carregarClientes() {
    try {
        const response = await fetch(API_URL);
        const clientes = await response.json();
        
        clientesList.innerHTML = '';
        
        if (clientes.length === 0) {
            clientesList.innerHTML = '<p>Nenhum cliente cadastrado.</p>';
            return;
        }
        
        clientes.forEach(cliente => {
            const clienteDiv = document.createElement('div');
            clienteDiv.className = 'cliente-item';
            clienteDiv.innerHTML = `
                <div>
                    <strong>${cliente.nome}</strong>
                    <p>${cliente.email}</p>
                </div>
                <button class="delete-btn" data-id="${cliente._id}">Excluir</button>
            `;
            clientesList.appendChild(clienteDiv);
        });
        
        // Adiciona event listeners aos botões de exclusão
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', excluirCliente);
        });
    } catch (error) {
        console.error('Erro ao carregar clientes:', error);
        clientesList.innerHTML = '<p>Erro ao carregar clientes. Tente novamente.</p>';
    }
}

// Função para cadastrar um novo cliente
async function cadastrarCliente(event) {
    event.preventDefault();
    
    const cliente = {
        nome: nomeInput.value,
        email: emailInput.value
    };
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });
        
        if (response.ok) {
            nomeInput.value = '';
            emailInput.value = '';
            carregarClientes();
        } else {
            alert('Erro ao cadastrar cliente. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        alert('Erro ao cadastrar cliente. Verifique o console para mais detalhes.');
    }
}

// Função para excluir um cliente
async function excluirCliente(event) {
    const clienteId = event.target.getAttribute('data-id');
    
    if (!confirm('Tem certeza que deseja excluir este cliente?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${clienteId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            carregarClientes();
        } else {
            alert('Erro ao excluir cliente. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        alert('Erro ao excluir cliente. Verifique o console para mais detalhes.');
    }
}

// Event Listeners
clienteForm.addEventListener('submit', cadastrarCliente);

// Carrega os clientes quando a página é carregada
document.addEventListener('DOMContentLoaded', carregarClientes);